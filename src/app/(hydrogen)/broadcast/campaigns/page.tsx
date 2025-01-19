import CampaignsWidget from '@/app/shared/broadcast/campaigns';
import CampaignForm from '@/app/shared/broadcast/campaigns/campaign-form';
import ModalButton from '@/app/shared/modal-button';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Campaigns'),
};

export default function CampaignsPage() {
  return (
    <div>
      <ModalButton
        label="Add Campaign"
        view={<CampaignForm />}
        customSize="1000px"
        className="w-45 mt-7 @lg:w-auto"
      />
      <CampaignsWidget
        title={'Campaign'}
        description={'List of Campaign'}
        className="mt-10"
      />
    </div>
  );
}
