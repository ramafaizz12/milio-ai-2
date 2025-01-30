'use client';

import { useAtom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';
import { useChats } from '@/app/api/chat-inbox/useChats'; // Ambil data dari API
import SimpleBar from '@core/ui/simplebar';
import cn from '@core/utils/class-names';

export const messageIdAtom = atomWithStorage('messageId', '');
export const dataAtom = atomWithReset<any[]>([]);

interface MessageItemProps {
  message: any;
  className?: string;
}

export function MessageItem({ className, message }: MessageItemProps) {
  const [messageId, setMessageId] = useAtom(messageIdAtom);
  const isActive = messageId === message.id;

  const handleChange = () => {
    setMessageId(message.id);
  };

  return (
    <div
      onClick={handleChange}
      className={cn(
        className,
        'grid cursor-pointer grid-cols-[24px_1fr] items-start gap-3 border-t border-muted p-5',
        isActive && 'border-t-2 border-t-primary dark:bg-gray-100/70'
      )}
    >
      <div>
        <h4 className="text-sm font-semibold">{message.message}</h4>
        <span className="text-xs text-gray-500">{message.timestamp}</span>
      </div>
    </div>
  );
}

interface MessageListProps {
  className?: string;
}

export default function MessageList({ className }: MessageListProps) {
  const { data: chats, isLoading } = useChats(); // Ambil data dari API
  const [data, setData] = useAtom(dataAtom);

  useEffect(() => {
    if (chats) {
      setData(chats.data); // Simpan data dari API ke atom
    }
  }, [chats, setData]);

  if (isLoading) {
    return <p>Loading messages...</p>;
  }

  return (
    <div
      className={cn(
        className,
        'overflow-hidden rounded-lg border border-muted'
      )}
    >
      <SimpleBar>
        {data.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </SimpleBar>
    </div>
  );
}
