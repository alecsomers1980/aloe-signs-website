'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { constructionProjects, portfolioCategories, Project } from '@/lib/portfolio';
import { X } from 'lucide-react';

import Link from 'next/link';

export default function PortfolioPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalMainImage, setModalMainImage] = useState<string>('');

    // When project selected, reset main image to default
    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setModalMainImage(project.image);
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero Section (Rich Hero) */}
                <div className="relative bg-charcoal text-white py-20 md:py-32">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-sm text-light-grey mb-6">
                                <Link href="/" className="hover:text-aloe-green transition-colors">
                                    Home
                                </Link>
                                <span>/</span>
                                <span className="text-white">Portfolio</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Our Portfolio
                            </h1>
                            <p className="text-lg md:text-xl text-light-grey">
                                Explore our recent work and see how we help businesses stand out.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Categories Navigation */}
                <section className="py-8 bg-bg-grey border-b border-border-grey sticky top-[80px] z-30 shadow-sm">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="flex flex-wrap justify-center gap-4">
                            {portfolioCategories.filter(cat => cat !== 'All').map((category) => (
                                <Link
                                    key={category}
                                    href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="px-6 py-2 rounded-full text-sm font-semibold bg-white text-medium-grey hover:bg-aloe-green hover:text-charcoal border border-border-grey transition-all shadow-sm hover:shadow-md"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const id = category.toLowerCase().replace(/\s+/g, '-');
                                        const element = document.getElementById(id);
                                        if (element) {
                                            const headerOffset = 180; // Adjust for sticky header + nav
                                            const elementPosition = element.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.scrollY - headerOffset;

                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Portfolio Sections */}
                <div className="py-20 space-y-20">
                    {portfolioCategories.filter(cat => cat !== 'All').map((category) => {
                        const categoryProjects = constructionProjects.filter(project => project.category === category);

                        if (categoryProjects.length === 0) return null;

                        return (
                            <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
                                <div className="max-w-[1400px] mx-auto px-6">
                                    <div className="flex items-center gap-4 mb-8">
                                        <h2 className="text-3xl font-bold text-charcoal">{category}</h2>
                                        <div className="h-px bg-border-grey flex-1"></div>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {categoryProjects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                                onClick={() => handleProjectClick(project)}
                                            >
                                                <div className="relative aspect-[4/3] overflow-hidden">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <span className="text-white font-bold text-lg border-2 border-aloe-green px-6 py-2 rounded-full bg-charcoal/80">
                                                            View Project
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-charcoal group-hover:text-aloe-green transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-medium-grey mt-2 line-clamp-2">{project.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </main>
            <Footer />

            {/* Project Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    ></div>

                    <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-bg-grey transition-colors z-20"
                        >
                            <X className="w-6 h-6 text-charcoal" />
                        </button>

                        <div className="grid lg:grid-cols-2">
                            {/* Images Column */}
                            <div className="bg-charcoal p-8 space-y-4">
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-white/10">
                                    <Image
                                        src={modalMainImage}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover transition-all duration-300"
                                    />
                                </div>
                                {selectedProject.images && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {/* Main image thumbnail included */}
                                        <div
                                            className={`relative aspect-[4/3] rounded overflow-hidden border cursor-pointer ${modalMainImage === selectedProject.image ? 'border-aloe-green ring-2 ring-aloe-green' : 'border-white/10 hover:border-white/50'}`}
                                            onClick={() => setModalMainImage(selectedProject.image)}
                                        >
                                            <Image
                                                src={selectedProject.image}
                                                alt="Main view"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Additional images */}
                                        {selectedProject.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className={`relative aspect-[4/3] rounded overflow-hidden border cursor-pointer ${modalMainImage === img ? 'border-aloe-green ring-2 ring-aloe-green' : 'border-white/10 hover:border-white/50'}`}
                                                onClick={() => setModalMainImage(img)}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${selectedProject.title} ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Info Column */}
                            <div className="p-8 lg:p-12 overflow-y-auto">
                                <div className="mb-2 text-aloe-green font-bold uppercase tracking-wider text-sm sticky top-0 bg-white py-2">
                                    {selectedProject.category}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                                    {selectedProject.title}
                                </h2>

                                <div className="prose prose-lg text-medium-grey mb-8">
                                    <p>{selectedProject.description}</p>
                                    {selectedProject.challenge && (
                                        <>
                                            <h4 className="text-charcoal font-bold mt-6 mb-2">The Challenge</h4>
                                            <p>{selectedProject.challenge}</p>
                                        </>
                                    )}
                                    {selectedProject.solution && (
                                        <>
                                            <h4 className="text-charcoal font-bold mt-6 mb-2">The Solution</h4>
                                            <p>{selectedProject.solution}</p>
                                        </>
                                    )}
                                </div>

                                <div className="border-t border-border-grey pt-6 grid grid-cols-2 gap-6">
                                    {selectedProject.client && (
                                        <div>
                                            <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-1">Client</h4>
                                            <p className="text-medium-grey">{selectedProject.client}</p>
                                        </div>
                                    )}
                                    {selectedProject.location && (
                                        <div>
                                            <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-1">Location</h4>
                                            <p className="text-medium-grey">{selectedProject.location}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-12">
                                    <a
                                        href="/get-quote"
                                        className="inline-block w-full text-center px-8 py-4 bg-aloe-green text-charcoal font-bold rounded hover:bg-green-hover transition-colors"
                                    >
                                        Get a Quote Like This
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
