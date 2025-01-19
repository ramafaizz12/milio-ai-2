import TemplatesWidget from '@/app/shared/broadcast/templates';
import TemplateForm from '@/app/shared/broadcast/templates/template-form';

import ModalButton from '@/app/shared/modal-button';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Templates'),
};

export default function TemplatePage() {
  return (
    <div>
      <ModalButton
        label="Add Template"
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
