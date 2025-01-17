import BroadcastDashboard from '@/app/shared/broadcast';
import ContactDashboard from '@/app/shared/contact';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Contact'),
};

const pageHeader = {
  title: 'Contact',
  breadcrumb: [
    {
      href: routes.broadcast.dashboard,
      name: 'Home',
    },
    {
      name: 'Contact',
    },
  ],
};
export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      >
        {/* <PosSearch /> */}
      </PageHeader>
      <ContactDashboard />
    </div>
  );
}
