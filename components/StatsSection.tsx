export default function StatsSection() {
    const stats = [
        { value: '25+', label: 'Years in Business' },
        { value: '500+', label: 'Projects Completed' },
        { value: '180+', label: 'Vehicles Wrapped' },
        { value: '4.9★', label: 'Google Rating' },
    ];

    return (
        <section className="py-16 md:py-20 bg-charcoal text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-aloe-green mb-2">
                                {stat.value}
                            </div>
                            <div className="text-light-grey">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
