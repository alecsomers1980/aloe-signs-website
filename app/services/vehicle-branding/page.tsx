import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/lib/services';

export default function VehicleBrandingPage() {
    const service = getServiceBySlug('vehicle-branding');

    if (!service) {
        return <div>Service not found</div>;
    }

    return <ServicePageTemplate service={service} />;
}
