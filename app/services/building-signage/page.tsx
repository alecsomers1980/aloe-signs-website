import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function BuildingSignagePage() {
    const service = getServiceBySlug('building-signage');
    if (!service) return <div>Service not found</div>;
    return <ServicePageTemplate service={service} />;
}
