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
      href: routes.aiagent.dashboard,
      name: 'AI Agents',
    },
    {
      name: 'Detail Bot',
    },
  ],
};
export default function DetailPageBot() {}
