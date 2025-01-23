'use client';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/app/shared/page-header';
import AiagentNav from '@/app/shared/ai-agents/navigation';

const pageHeader = {
  title: 'Detail',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Detail',
    },
  ],
};

export default function DetailBotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useSearchParams();
  const id = router.get('id');
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <AiagentNav />
      {children}
    </>
  );
}
