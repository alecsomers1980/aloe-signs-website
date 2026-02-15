import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function SetBuildingPage() {
    const service = getServiceBySlug('set-building');
    if (!service) return <div>Service not found</div>;
    return <ServicePageTemplate service={service} />;
}
