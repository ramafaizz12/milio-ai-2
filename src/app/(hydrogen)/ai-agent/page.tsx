import AiAgentsDashboard from '@/app/shared/ai-agents';
import ConnectedPlatformDashboard from '@/app/shared/connected-platform';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('AI Agents'),
};

const pageHeader = {
  title: 'AI Agents',
  breadcrumb: [
    {
      href: routes.broadcast.dashboard,
      name: 'Home',
    },
    {
      name: 'AI Agents',
    },
  ],
};
export default function AiagentsPage() {
  return (
    <div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold"
      >
        {/* <PosSearch /> */}
      </PageHeader>
      <AiAgentsDashboard />
    </div>
  );
}
