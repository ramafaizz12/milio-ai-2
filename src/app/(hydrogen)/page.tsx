import { metaObject } from '@/config/site.config';
import Dashboard from '../shared/file/dashboard';

export const metadata = {
  ...metaObject(),
};

export default function DashboardPage() {
  return <Dashboard />;
}
