import BroadcastDashboard from '@/app/shared/broadcast';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Broadcast'),
};

const pageHeader = {
  title: 'Broadcast',
  breadcrumb: [
    {
      href: routes.broadcast.dashboard,
      name: 'Home',
    },
    {
      name: 'Broadcast',
    },
  ],
};
export default function BroadcastPage() {
  return (
    <div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      >
        {/* <PosSearch /> */}
      </PageHeader>
      <BroadcastDashboard />
    </div>
  );
}
