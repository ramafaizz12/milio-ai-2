import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import { useTemplates } from '@/app/api/broadcast/useTemplates';
import { useReceipents } from '@/app/api/broadcast/useReceipents';
import { useContacts } from '@/app/api/contact/useContact';
import { usePlatform } from '@/app/api/platform/usePlatform';
import { useAgent } from '@/app/api/agent/useAgent';
export const metadata = {
  ...metaObject('Files'),
};

export default function File() {
  const { isLoading: LoadingTemplate, isError: errorTemplate } = useTemplates();
  const { isLoading: LoadingReceipent, isError: errorReceipent } =
    useReceipents();
  const { isLoading: LoadingPlatform, isError: errorPlatform } = usePlatform();
  const { isLoading: LoadingContacts, isError: errorContacts } = useContacts();
  const { isLoading: LoadingAgents, isError: errorAgents } = useAgent();
  if (
    LoadingTemplate ||
    LoadingReceipent ||
    LoadingPlatform ||
    LoadingContacts ||
    LoadingAgents
  ) {
    return <div>Loading data, please wait...</div>;
  }

  // Kondisi error
  if (
    errorTemplate ||
    errorReceipent ||
    errorPlatform ||
    errorContacts ||
    errorAgents
  ) {
    return <div>Error loading data. Please try again later.</div>;
  }
  return <FileDashboard />;
}
