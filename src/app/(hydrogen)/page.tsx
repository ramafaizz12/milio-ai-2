import { metaObject } from '@/config/site.config';
import Dashboard from '../shared/file/dashboard';
import FetchDataDashboard from '../shared/file/dashboard/fetch-data';

export const metadata = {
  ...metaObject(),
};

export default function DashboardPage() {
  return (
    <div>
      <FetchDataDashboard />
      <Dashboard />
    </div>
  );
}
