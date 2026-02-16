import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="relative h-12 w-40 mb-4">
                            <Image
                                src="/aloe-logo.png"
                                alt="Aloe Signs Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-light-grey mb-4">
                            Products that builds businesses.
                        </p>
                        <div className="space-y-2 text-light-grey">
                            <p>068 883 8049</p>
                            <p>team@aloesigns.co.za</p>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold mb-4">Services</h4>
                        <ul className="space-y-2 text-light-grey">
                            <li><Link href="/services/vehicle-branding" className="hover:text-aloe-green transition-colors">Vehicle Branding</Link></li>
                            <li><Link href="/services/building-signage" className="hover:text-aloe-green transition-colors">Building Signage</Link></li>
                            <li><Link href="/services/shopfronts" className="hover:text-aloe-green transition-colors">Shopfronts</Link></li>
                            <li><Link href="/services/wayfinding-interior" className="hover:text-aloe-green transition-colors">Wayfinding & Interior</Link></li>
                            <li><Link href="/services/billboards-outdoor" className="hover:text-aloe-green transition-colors">Billboards & Outdoor</Link></li>
                            <li><Link href="/services/large-format-print" className="hover:text-aloe-green transition-colors">Large Format Print</Link></li>
                            <li><Link href="/services/screen-printing" className="hover:text-aloe-green transition-colors">Screen Printing</Link></li>
                            <li><Link href="/services/set-building" className="hover:text-aloe-green transition-colors">Set Building</Link></li>
                        </ul>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-light-grey">
                            <li><Link href="/shop" className="hover:text-aloe-green transition-colors">All Products</Link></li>
                            <li><Link href="/shop?category=estate-boards" className="hover:text-aloe-green transition-colors">Estate Agent Boards</Link></li>
                            <li><Link href="/shop?category=safety-signs" className="hover:text-aloe-green transition-colors">Safety Signs</Link></li>
                            <li><Link href="/shop?category=parking-signs" className="hover:text-aloe-green transition-colors">Parking Signs</Link></li>
                            <li><Link href="/shop?category=property-signs" className="hover:text-aloe-green transition-colors">Property Signs</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-light-grey">
                            <li><Link href="/about" className="hover:text-aloe-green transition-colors">About Us</Link></li>
                            <li><Link href="/portfolio" className="hover:text-aloe-green transition-colors">Portfolio</Link></li>
                            <li><Link href="/contact" className="hover:text-aloe-green transition-colors">Contact</Link></li>
                            <li><Link href="/get-quote" className="hover:text-aloe-green transition-colors">Get a Quote</Link></li>
                            <li><Link href="/faqs" className="hover:text-aloe-green transition-colors">FAQs</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border-grey/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-light-grey text-sm">
                    <p>© 2026 Aloe Signs. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-aloe-green transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-aloe-green transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
