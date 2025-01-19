import { metaObject } from '@/config/site.config';
import PasswordSettingsView from '@/app/shared/account-settings/password-settings';

export const metadata = {
  ...metaObject('Password'),
};

export default function ProfileSettingsFormPageee() {
  return (
    <div></div>
    // <PasswordSettingsView
    //   settings={{
    //     currentPassword: '9876543210',
    //     newPassword: '',
    //     confirmedPassword: '',
    //   }}
    // />
  );
}
