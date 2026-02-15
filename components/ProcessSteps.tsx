interface Step {
    number: string;
    title: string;
    description: string;
}

interface ProcessStepsProps {
    title: string;
    subtitle?: string;
    steps: Step[];
}

export default function ProcessSteps({ title, subtitle, steps }: ProcessStepsProps) {
    return (
        <section className="py-16 md:py-20 bg-bg-grey">
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

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector Line (except for last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border-grey -translate-x-1/2 z-0"></div>
                            )}

                            {/* Step Card */}
                            <div className="bg-white p-6 rounded-lg relative z-10">
                                {/* Number Badge */}
                                <div className="w-12 h-12 bg-aloe-green rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold text-charcoal">{step.number}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-charcoal mb-2">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-medium-grey">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
