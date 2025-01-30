'use client';

import { atom, useAtom } from 'jotai';
import { useChats } from '@/app/api/chat-inbox/useChats'; // Ambil data dari API
import SimpleBar from '@core/ui/simplebar';
import cn from '@core/utils/class-names';
import { dataAtom } from '@/app/shared/chat/inbox/message-list';

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

interface TabButtonProps {
  item: {
    value: string;
    label: string;
    count: number;
  };
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ item, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2 py-2 text-sm outline-none',
        isActive
          ? 'font-medium text-gray-900'
          : 'text-gray-500 hover:text-gray-800'
      )}
    >
      <span>{item.label}</span>
      <span className="text-xs">{item.count}</span>
      <span
        className={cn(
          'absolute -bottom-px left-0 h-0.5 w-full',
          isActive ? 'bg-primary' : 'bg-transparent'
        )}
      />
    </button>
  );
}
