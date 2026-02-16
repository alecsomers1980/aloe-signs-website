import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AutoScrollTabs from '@/components/AutoScrollTabs';
import ShopSpecials from '@/components/ShopSpecials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroBanner />
        <AutoScrollTabs />
        <ShopSpecials />

        {/* Stats Section */}
        <section className="py-20 bg-dark-grey">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-aloe-green mb-2">25+</div>
                <div className="text-light-grey">Years in Business</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-aloe-green mb-2">500+</div>
                <div className="text-light-grey">Projects Completed</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-aloe-green mb-2">180+</div>
                <div className="text-light-grey">Vehicles Wrapped</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-aloe-green mb-2">4.9★</div>
                <div className="text-light-grey">Google Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-bg-grey">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              Ready to start your project?
            </h2>
            <p className="text-medium-grey text-lg mb-8">
              Get a free quote within 48 hours. No obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/get-quote"
                className="px-8 py-4 bg-aloe-green text-charcoal font-semibold rounded hover:bg-green-hover transition-colors text-lg"
              >
                Get a Quote
              </a>
              <a
                href="tel:0688838049"
                className="px-8 py-4 border-2 border-charcoal text-charcoal font-semibold rounded hover:bg-charcoal hover:text-white transition-colors text-lg"
              >
                Call 068 883 8049
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
