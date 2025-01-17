import AgentDashboard from '@/app/shared/human-agent';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Human Agent'),
};

const pageHeader = {
  title: 'Human Agent',
  breadcrumb: [
    {
      href: routes.broadcast.dashboard,
      name: 'Home',
    },
    {
      name: 'Human Agent',
    },
  ],
};
export default function AgentPage() {
  return (
    <div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      >
        {/* <PosSearch /> */}
      </PageHeader>
      <AgentDashboard />
    </div>
  );
}
