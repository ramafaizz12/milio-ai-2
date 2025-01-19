import cn from '@core/utils/class-names';
import WidgetCard from '@core/components/cards/widget-card';
import ShipmentTable from './table';

type TemplatesWidgetProps = {
  title: string;
  description: string;
  className?: string;
};

export default function TemplatesWidget({
  title,
  description,
  className,
}: TemplatesWidgetProps) {
  return (
    <WidgetCard
      title={title}
      description={description}
      descriptionClassName="mb-6 mt-2"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="px-5 pt-5 lg:px-5 lg:pt-7"
    >
      <ShipmentTable />
    </WidgetCard>
  );
}
