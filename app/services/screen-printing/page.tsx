import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function ScreenPrintingPage() {
    const service = getServiceBySlug('screen-printing');
    if (!service) return <div>Service not found</div>;
    return <ServicePageTemplate service={service} />;
}
