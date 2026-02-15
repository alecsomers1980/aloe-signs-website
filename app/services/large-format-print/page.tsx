import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function LargeFormatPrintPage() {
    const service = getServiceBySlug('large-format-print');
    if (!service) return <div>Service not found</div>;
    return <ServicePageTemplate service={service} />;
}
