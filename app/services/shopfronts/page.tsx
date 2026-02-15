import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function ShopfrontsPage() {
    const service = getServiceBySlug('shopfronts');
    if (!service) return <div>Service not found</div>;
    return <ServicePageTemplate service={service} />;
}
