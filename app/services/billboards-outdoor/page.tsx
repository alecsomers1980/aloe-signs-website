import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function BillboardsOutdoorPage() {
    const service = getServiceBySlug('billboards-outdoor');
    if (!service) return <div>Service not found</div>;
    return <ServicePageTemplate service={service} />;
}
