import FileStats from '@/app/shared/file/dashboard/file-stats';
import MenuWidgets from './menu-widgets';
export default function Dashboard() {
  return (
    <div className="@container">
      <FileStats className="mb-2 2xl:mb-2" />
      <MenuWidgets />
    </div>
  );
}
