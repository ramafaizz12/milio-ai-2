import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import BroadcastNav from '@/app/shared/broadcast/navigation';

const pageHeader = {
  title: 'Broadcast',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Broadcast',
    },
  ],
};

export default function BroadcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <BroadcastNav />
      {children}
    </>
  );
}
