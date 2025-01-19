'use client';
import logobot from '@public/logo-bot.svg';
import logowa from '@public/wa-bisnis.svg';
import { useBot } from '@/app/api/chatbot/useBot';
import AddBot from './add-bot';
import BotPreview from './bot-preview';
import AiForm from './ai-form';
import ModalButton from '../modal-button';
export default function AiAgentsDashboard() {
  const { data, isLoading } = useBot();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || data.data.length === 0) {
    return (
      <ModalButton
        label="Create New"
        view={<AiForm />}
        customSize="900px"
        className="mb-3 mt-0 h-auto h-full w-full @lg:w-auto"
      />
    );
  }
  return (
    <div className="@container">
      <div className="mt-10 grid grid-cols-1 place-content-center gap-6 @container lg:grid-cols-3 lg:gap-8">
        {data.data.map((bots: any) => (
          <BotPreview
            key={bots.id}
            bot={bots}
            icon={logobot}
            title={bots.name}
            preview={`/platforms/${bots.id}`}
            description={`${bots.description}`}
          />
        ))}
        <ModalButton
          label="Create New"
          view={<AiForm />}
          customSize="900px"
          className="mb-3 mt-0 h-auto h-full w-full @lg:w-auto"
        />
      </div>
    </div>
  );
}
