import ReceipentWidget from '@/app/shared/broadcast/receipents';
import ReceipentForm from '@/app/shared/broadcast/receipents/receipent-form';
import ModalButton from '@/app/shared/modal-button';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Receipent'),
};

export default function ReceipentPage() {
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
