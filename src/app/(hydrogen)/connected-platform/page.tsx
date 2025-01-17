import ConnectedPlatformDashboard from '@/app/shared/connected-platform';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Connected Platform'),
};

const pageHeader = {
  title: 'Connected Platform',
  breadcrumb: [
    {
      href: routes.broadcast.dashboard,
      name: 'Home',
    },
    {
      name: 'Connected Platform',
    },
  ],
};
export default function ConnectedPlatformPage() {
  return (
    <div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      >
        {/* <PosSearch /> */}
      </PageHeader>
      <ConnectedPlatformDashboard />
    </div>
  );
}
