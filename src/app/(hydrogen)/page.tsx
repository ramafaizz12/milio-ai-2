import { metaObject } from '@/config/site.config';
import Dashboard from '../shared/file/dashboard';
import FetchDataDashboard from '../shared/file/dashboard/fetch-data';
import OpenFormOrganization from '../shared/file/dashboard/openform-organization';

export const metadata = {
  ...metaObject(),
};

export default function DashboardPage() {
  return (
    <div>
      <OpenFormOrganization />
      <FetchDataDashboard />
      <Dashboard />
    </div>
  );
}
