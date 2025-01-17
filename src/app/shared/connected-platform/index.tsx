'use client';
import logowa from '@public/wa-bisnis.svg';
import ConnectedPreview from './connected-preview';
import AddConnected from './add-connected';
import { usePlatform } from '@/app/api/platform/usePlatform';
import { useAgent } from '@/app/api/agent/useAgent';
import { useBot } from '@/app/api/chatbot/useBot';
export default function ConnectedPlatformDashboard() {
  const { data, isLoading } = usePlatform();
  const { data: datagent, isLoading: loading } = useAgent();
  const { data: databots, isLoading: loadingbots } = useBot();

  if (isLoading || loading || loadingbots) {
    return <p>Loading...</p>;
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="mt-10 grid grid-cols-1 place-content-center gap-6 @container lg:grid-cols-3 lg:gap-8">
        <AddConnected />
      </div>
    );
  }
  return (
    <div className="@container">
      <div className="mt-10 grid grid-cols-1 place-content-center gap-6 @container lg:grid-cols-3 lg:gap-8">
        {data.data.map((platform: any) => (
          <ConnectedPreview
            key={platform.id}
            data={datagent}
            bot={databots}
            icon={logowa}
            title={platform.platform_name}
            preview={`/platforms/${platform.id}`}
            description={`Platform Type: ${platform.platform_type}`}
          />
        ))}
        <AddConnected />
      </div>
    </div>
  );
}
