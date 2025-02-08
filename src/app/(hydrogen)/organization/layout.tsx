import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import OrganizationNav from '@/app/shared/organization/navigation';

const pageHeader = {
  title: 'Organization',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Organization',
    },
  ],
};

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <OrganizationNav />
      {children}
    </>
  );
}
