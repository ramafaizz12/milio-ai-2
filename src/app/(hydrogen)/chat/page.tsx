import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import ChatInbox from '@/app/shared/chat/inbox';
import InboxTabs from '@/app/shared/chat/inbox/inbox-tabs';

export const metadata = {
  ...metaObject('Inbox'),
};

const pageHeader = {
  title: 'Inbox',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Inbox',
    },
  ],
};

export default function ChatPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <Button className="mt-4 w-full @lg:mt-0 @lg:w-auto">
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Create Ticket
        </Button> */}
      </PageHeader>

      <InboxTabs />

      <ChatInbox />
    </>
  );
}
