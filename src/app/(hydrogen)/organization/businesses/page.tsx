import TemplatesWidget from '@/app/shared/broadcast/templates';
import TemplateForm from '@/app/shared/broadcast/templates/template-form';

import ModalButton from '@/app/shared/modal-button';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Businesses'),
};

export default function BusinessPage() {
  return (
    <div>
      <ModalButton
        label="Add Business"
        view={<TemplateForm />}
        customSize="1000px"
        className="w-45 mt-7 @lg:w-auto"
      />
      <TemplatesWidget
        title={'Templates'}
        description={'List of Templates'}
        className="mt-10"
      />
    </div>
  );
}
