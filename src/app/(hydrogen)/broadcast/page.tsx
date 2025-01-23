import { metaObject } from '@/config/site.config';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import BroadcastDashboard from '@/app/shared/broadcast';
import ModalButton from '@/app/shared/modal-button';
import ReceipentWidget from '@/app/shared/broadcast/receipents';
import ReceipentForm from '@/app/shared/broadcast/receipents/receipent-form';

export const metadata = {
  ...metaObject('Broadcast'),
};

export default function BroadcastFormPage() {
  return (
    <div>
      <ModalButton
        label="Add Receipent"
        view={<ReceipentForm />}
        customSize="1000px"
        className="w-45 mt-7 @lg:w-auto"
      />
      <ReceipentWidget
        title={'Receipents'}
        description={'List of Receipents'}
        className="mt-10"
      />
    </div>
  );
}
