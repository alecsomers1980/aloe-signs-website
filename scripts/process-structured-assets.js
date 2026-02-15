/* eslint-disable */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const heicConvert = require('heic-convert');

// Source and Output Bases
const sourceBase = path.join(__dirname, '..', 'public', 'New');
const outputBase = path.join(__dirname, '..', 'public', 'images');
const libDir = path.join(__dirname, '..', 'lib');

// Ensure output directories exist
const dirs = ['banner', 'products', 'services', 'portfolio'];
dirs.forEach(d => {
    const p = path.join(outputBase, d);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Service ID Mapping
const serviceMap = {
    'vehicle': 'vehicle-branding',
    'building': 'building-signage',
    'shopfront': 'shopfronts',
    'wayfinder': 'wayfinding', // AutoScrollTabs uses 'wayfinding' or 'wayfinding-interior'? Code uses 'wayfinder.jpg' currently. I'll normalize to 'wayfinding.jpg' and update code.
    'wayfinding': 'wayfinding',
    'billboards': 'billboards',
    'large format print': 'large-format',
    'set building': 'set-building'
};

async function processImage(inputPath, outputPath, width = 1200) {
    try {
        const stat = fs.statSync(inputPath);
        if (stat.isDirectory()) return; // Skip directories

        let inputBuffer = fs.readFileSync(inputPath);
        const ext = path.extname(inputPath).toLowerCase();

        // Skip non-image files
        if (!['.jpg', '.jpeg', '.png', '.heic', '.webp'].includes(ext)) return;

        if (ext === '.heic') {
            inputBuffer = await heicConvert({
                buffer: inputBuffer,
                format: 'JPEG',
                quality: 1
            });
        }

        await sharp(inputBuffer)
            .resize({ width: width, withoutEnlargement: true })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(outputPath);

        console.log(`Processed: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    } catch (err) {
        console.error(`Error processing ${inputPath}:`, err.message);
    }
}

// Helper to get all files recursively
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (!file.startsWith('.')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

async function run() {
    // 1. Process Banner
    const bannerSrc = path.join(sourceBase, 'Banner');
    if (fs.existsSync(bannerSrc)) {
        const files = fs.readdirSync(bannerSrc).filter(f => !f.startsWith('.') && fs.statSync(path.join(bannerSrc, f)).isFile());
        for (let i = 0; i < files.length; i++) {
            await processImage(
                path.join(bannerSrc, files[i]),
                path.join(outputBase, 'banner', `banner-${i + 1}.jpg`)
            );
        }
    }

    // 2. Process Estate Agent (Products)
    const estateSrc = path.join(sourceBase, 'Estate Agent');
    if (fs.existsSync(estateSrc)) {
        const files = getAllFiles(estateSrc);
        const mainFile = files.find(f => path.basename(f).toLowerCase().includes('main'));
        if (mainFile) {
            await processImage(mainFile, path.join(outputBase, 'products', 'estate-agent-main.jpg'));
        }
    }

    // 3. Process Services (New Folder)
    const servicesSrc = path.join(sourceBase, 'Services');
    const portfolioSrcForFallback = path.join(sourceBase, 'Portfolio');

    // Service ID Mapping
    // ... (defined above)

    // Helper to find Main in Portfolio recursively
    function findMainInPortfolio(categoryName) {
        const catDir = path.join(portfolioSrcForFallback, categoryName);
        if (!fs.existsSync(catDir)) return null;

        const files = getAllFiles(catDir);
        // Prioritize Main.* files
        const main = files.find(f => path.basename(f).toLowerCase().startsWith('main.'));
        if (main) return main;

        // Fallback to any image if no Main (but user seems to use Main)
        return files.find(f => ['.jpg', '.jpeg', '.png', '.heic'].includes(path.extname(f).toLowerCase()));
    }

    if (fs.existsSync(servicesSrc)) {
        // Get list of potential services from Map keys + folders in Services
        // Actually, we want to ensure we cover all SERVICE IDS in our map
        const serviceKeys = Object.keys(serviceMap);

        // Add explicit handling for Services that might not be in Services folder but in Portfolio
        // or need overriding.
        const overrides = ['vehicle', 'building', 'shopfront'];

        // We iterate the MAP keys to ensure we cover everything, or iterate folders?
        // Iterating folders in Services is good, but Vehicle/Shopfront are empty there.
        // So we should iterate our target Service Map or a superset.

        // Let's iterate the folders in Services first, then check missing ones?
        // No, simpler: Iterate the Service Map.
        const processedIds = new Set();

        const serviceDirs = fs.readdirSync(servicesSrc).filter(f => fs.statSync(path.join(servicesSrc, f)).isDirectory());

        // Process existing folders in Services (Default path)
        /* 
        // DISABLED to prevent overwriting manual overrides (Vehicle/Shopfront)
        for (const dirName of serviceDirs) {
            const normalizedName = dirName.toLowerCase().trim();
            const mapKey = Object.keys(serviceMap).find(k => normalizedName.includes(k));
            if (!mapKey) continue;

            const targetId = serviceMap[mapKey];

            // SKIP Screen Printing here (handled specially)
            if (targetId === 'screen-printing') continue;

            // Check if this is an override case
            if (overrides.some(o => normalizedName.includes(o))) {
                console.log(`Overriding Service Image for ${dirName} with Portfolio source...`);
                // Find matching Portfolio folder?
                // Vehicle -> Vehicle Rapping
                // Building -> Building Signage
                // Shopfront -> Shop Front

                let portfolioCat = '';
                if (targetId === 'vehicle-branding') portfolioCat = 'Vehicle Rapping';
                if (targetId === 'building-signage') portfolioCat = 'Building Signage';
                if (targetId === 'shopfronts') portfolioCat = 'Shop Front';

                const mainFile = findMainInPortfolio(portfolioCat);
                if (mainFile) {
                    await processImage(mainFile, path.join(outputBase, 'services', `${targetId}.jpg`));
                    processedIds.add(targetId);
                } else {
                    console.warn(`No Portfolio fallback found for ${dirName}`);
                }
                continue;
            }

            const dirPath = path.join(servicesSrc, dirName);
            const files = getAllFiles(dirPath);
            const mainFile = files.find(f => path.basename(f).toLowerCase().includes('main')) || files[0];

            if (mainFile) {
                await processImage(mainFile, path.join(outputBase, 'services', `${targetId}.jpg`));
                processedIds.add(targetId);
            }
        }
        */

        // Handle Screen Printing (Plycholder)
        await sharp({
            create: {
                width: 1200,
                height: 800,
                channels: 4,
                background: { r: 240, g: 240, b: 240, alpha: 1 }
            }
        })
            .toFormat('jpg')
            .toFile(path.join(outputBase, 'services', 'screen-printing.jpg'));
        console.log('Generated placeholder for screen-printing.jpg');
    }

    // 4. Process Portfolio & Generate Data
    const portfolioSrc = path.join(sourceBase, 'Portfolio');
    const projects = [];

    if (fs.existsSync(portfolioSrc)) {
        const categories = fs.readdirSync(portfolioSrc).filter(f => fs.statSync(path.join(portfolioSrc, f)).isDirectory());

        for (const cat of categories) {
            if (cat.toLowerCase().includes('screen printing')) continue;

            const catDir = path.join(portfolioSrc, cat);
            const files = getAllFiles(catDir);
            const slug = cat.toLowerCase().replace(/\s+/g, '-');

            // Find main
            const mainFile = files.find(f => path.basename(f).toLowerCase().includes('main')) || files[0];
            const mainImageName = `${slug}-main.jpg`;

            if (mainFile) {
                await processImage(mainFile, path.join(outputBase, 'portfolio', mainImageName));
            }

            // Gallery Images
            const galleryImages = [];
            let count = 1;
            for (const file of files) {
                if (file === mainFile) continue;
                const galleryName = `${slug}-${count++}.jpg`;
                await processImage(file, path.join(outputBase, 'portfolio', galleryName));
                galleryImages.push(`/images/portfolio/${galleryName}`);
            }

            // Generate Rich Content based on Category
            let description = `Project showcase for ${cat}`;
            let challenge = "To create a distinctive visual identity that stands out in a competitive market while maintaining brand consistency.";
            let solution = "We implemented a high-quality signage solution using durable materials and precision installation techniques to ensure longevity and impact.";
            let content = `
                <p>This project represents our commitment to quality and attention to detail. We worked closely with the client to understand their specific needs and delivered a solution that exceeds expectations.</p>
                <p>From initial design concepts to final installation, every step was managed with precision. The resulting installation not only enhances visibility but also reinforces the professional image of the brand.</p>
            `;

            const catLower = cat.toLowerCase();
            if (catLower.includes('vehicle')) {
                description = "Transforming fleets into powerful mobile billboards with high-quality vinyl wraps.";
                challenge = "To design a vehicle wrap that is both eye-catching and informative, ensuring the brand message is clear even when the vehicle is in motion.";
                solution = "We used premium cast vinyl with UV lamination for durability. The design focuses on bold typography and high-contrast visuals to maximize impact on the road.";
                content = `
                    <h3>Mobile Brand Visibility</h3>
                    <p>Vehicle branding is one of the most cost-effective forms of advertising. For this project, we ensured that the design utilizes the vehicle's shape to create a dynamic flow.</p>
                    <p>Our installation team meticulously applied the wrap to ensure a bubble-free finish that protects the underlying paintwork while turning the vehicle into a 24/7 marketing asset.</p>
                `;
            } else if (catLower.includes('building') || catLower.includes('signage')) {
                description = "Enhancing corporate identity with clearer, premium building signage solutions.";
                challenge = "To create large-scale signage that is visible from a distance and withstands harsh weather conditions without fading.";
                solution = "We utilized fabricated aluminium channel letters with LED illumination for day and night visibility. The structure was engineered to ensure safety and stability.";
                content = `
                    <h3>Landmark Visibility</h3>
                    <p>Building signage is the anchor of physical branding. This improved facade not only helps customers locate the business but also communicates stability and professionalism.</p>
                    <p>The LED illumination ensures energy efficiency while providing brilliant brightness that makes the brand stand out in the skyline.</p>
                `;
            } else if (catLower.includes('shop') || catLower.includes('front')) {
                description = "Creating inviting retail environments with custom shopfront signage and window graphics.";
                challenge = "To transform a standard storefront into an inviting retail experience that attracts foot traffic and communicates the store's offering instantly.";
                solution = "We combined 3D fabricated lettering with vibrant window graphics to create a layered, dimensional look that draws the eye.";
                content = `
                    <h3>Retail Impact</h3>
                    <p>The storefront is the first point of interaction with customers. Our design maximizes this opportunity by creating a welcoming and professional entrance.</p>
                    <p>We used high-performance vinyls and durable substrates to ensure the signage remains pristine despite exposure to street-level elements.</p>
                `;
            }

            // Create Project Data
            projects.push({
                id: slug,
                title: cat,
                category: cat, // Or map to standard categories
                image: `/images/portfolio/${mainImageName}`,
                images: galleryImages,
                description: description,
                content: content,
                challenge: challenge,
                solution: solution,
                client: 'Recent Client',
                location: 'South Africa',
                date: '2024'
            });
        }
    }

    // Write lib/portfolio.ts
    const fileContent = `export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    images?: string[];
    description: string;
    content?: string;
    challenge?: string;
    solution?: string;
    client?: string;
    location?: string;
    date?: string;
}

export const constructionProjects: Project[] = ${JSON.stringify(projects, null, 4)};

export const portfolioCategories = [
    'All',
    ${projects.map(p => `'${p.category}'`).join(',\n    ')}
];
`;

    fs.writeFileSync(path.join(libDir, 'portfolio.ts'), fileContent);
    console.log('Generated lib/portfolio.ts');
}

run().then(() => console.log('Done'));
