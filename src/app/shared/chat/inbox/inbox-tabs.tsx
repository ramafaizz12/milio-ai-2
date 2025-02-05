'use client';

import { atom, useAtom } from 'jotai';
import { useChats } from '@/app/api/chat-inbox/useChats'; // Ambil data dari API
import SimpleBar from '@core/ui/simplebar';
import cn from '@core/utils/class-names';
import { dataAtom } from '@/app/shared/chat/inbox/message-list';
import { useTransition } from 'react';
import { Badge } from 'rizzui';

export const tabAtom = atom('unassigned');

interface InboxTabsProps {
  className?: string;
}

export default function InboxTabs({ className }: InboxTabsProps) {
  const { data: chats, isLoading } = useChats(); // Ambil data dari API
  const [tab, setTab] = useAtom(tabAtom);
  const [data, setData] = useAtom(dataAtom);

  if (isLoading) {
    return <p>Loading tabs...</p>;
  }

  const filteredTabs = [
    {
      value: 'unassigned',
      label: 'Unassigned',
      count:
        chats?.data.filter(
          (chat: { assignment_status: string }) =>
            chat.assignment_status === 'Unassigned'
        ).length ?? 0,
    },
    {
      value: 'assigned',
      label: 'Assigned to me',
      count:
        chats?.data.filter(
          (chat: { assignment_status: string }) =>
            chat.assignment_status === 'Assigned'
        ).length ?? 0,
    },
    {
      value: 'chat',
      label: 'Chat',
      count:
        chats?.data.filter(
          (chat: { assignment_status: string }) =>
            chat.assignment_status === 'Chat'
        ).length ?? 0,
    },
  ];

  const handleTabChange = (tabValue: string) => {
    setTab(tabValue);
    const updatedMessages = chats?.data.filter(
      (chat: { assignment_status: string }) =>
        chat.assignment_status === tabValue
    );
    setData(updatedMessages || []);
  };

  return (
    <div className={cn(className)}>
      <SimpleBar>
        <nav className="flex items-center gap-5 border-b border-gray-300">
          {filteredTabs.map((tabItem) => (
            <TabButton
              key={tabItem.value}
              item={tabItem}
              isActive={tab === tabItem.value}
              onClick={() => handleTabChange(tabItem.value)}
            />
          ))}
        </nav>
      </SimpleBar>
    </div>
  );
}

export function TabList() {
  const { data: chats, isLoading } = useChats(); // Ambil data dari API
  const [tab, setTab] = useAtom(tabAtom);
  const [data, setData] = useAtom(dataAtom);
  const [isPending, startTransition] = useTransition();

  if (isLoading) {
    return <p>Loading tabs...</p>;
  }

  const filteredTabs = [
    {
      value: 'unassigned',
      label: 'Unassigned',
      count:
        chats?.data.filter(
          (chat: { assignment_status: string }) =>
            chat.assignment_status === 'Unassigned'
        ).length ?? 0,
    },
    {
      value: 'assigned',
      label: 'Assigned to me',
      count:
        chats?.data.filter(
          (chat: { assignment_status: string }) =>
            chat.assignment_status === 'Assigned'
        ).length ?? 0,
    },
    {
      value: 'chat',
      label: 'Chat',
      count:
        chats?.data.filter(
          (chat: { assignment_status: string }) =>
            chat.assignment_status === 'Chat'
        ).length ?? 0,
    },
  ];

  const handleTabChange = (tabValue: string) => {
    setTab(tabValue);
    const updatedMessages = chats?.data.filter(
      (chat: { assignment_status: string }) =>
        chat.assignment_status === tabValue
    );
    setData(updatedMessages || []);
  };

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <SimpleBar>
      <nav className="flex items-center gap-5 border-b border-gray-300">
        {filteredTabs.map((nav) => (
          <TabButton
            item={nav}
            key={nav.value}
            isActive={tab === nav.value}
            disabled={isPending}
            onClick={() => handleTabChange(nav.value)}
          />
        ))}
      </nav>
    </SimpleBar>
  );
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    value: string;
    label: string;
    count: number;
  };
  isActive: boolean;
  onClick: () => void;
}
export function TabButton({
  item,
  isActive,
  onClick,
  ...props
}: TabButtonProps) {
  // console.log('data', data);

  return (
    <button
      className={cn(
        'relative flex items-center gap-2 py-2 text-sm outline-none',
        isActive
          ? 'font-medium text-gray-900'
          : 'text-gray-500 hover:text-gray-800'
      )}
      onClick={onClick}
      {...props}
    >
      <span className="whitespace-nowrap">{item.label}</span>
      <Badge size="sm" variant={isActive ? 'solid' : 'flat'}>
        {item.count}
      </Badge>
      <span
        className={cn(
          'absolute -bottom-px left-0 h-0.5 w-full',
          isActive ? 'bg-primary' : 'bg-transparent'
        )}
      />
    </button>
  );
}
