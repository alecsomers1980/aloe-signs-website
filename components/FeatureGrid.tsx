import { LucideIcon } from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface FeatureGridProps {
    title: string;
    subtitle?: string;
    features: Feature[];
}

export default function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-lg text-medium-grey max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-bg-grey p-6 rounded-lg hover:shadow-lg transition-shadow"
                            >
                                {/* Icon */}
                                {Icon && (
                                    <div className="w-12 h-12 bg-aloe-green rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-charcoal" />
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-bold text-charcoal mb-2">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-medium-grey leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
