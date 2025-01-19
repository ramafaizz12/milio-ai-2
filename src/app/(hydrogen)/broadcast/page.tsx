import { metaObject } from '@/config/site.config';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import BroadcastDashboard from '@/app/shared/broadcast';

export const metadata = {
  ...metaObject('Broadcast'),
};

export default function BroadcastFormPage() {
  return <BroadcastDashboard />;
}
