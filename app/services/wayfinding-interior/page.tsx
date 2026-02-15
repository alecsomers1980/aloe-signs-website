import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function WayfindingInteriorPage() {
    const service = getServiceBySlug('wayfinding-interior');
    if (!service) return <div>Service not found</div>;
    return <ServicePageTemplate service={service} />;
}
