'use client';

import { getStatusColors } from '@core/components/table-utils/get-status-color';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { routes } from '@/config/routes';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { Badge } from 'rizzui';
import { ShipmentListTableDataType } from './table';

const columnHelper = createColumnHelper<ShipmentListTableDataType>();

export const shipmentListColumns = [
  columnHelper.accessor('name', {
    id: 'name',
    size: 250,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => `${row.original.name}`,
  }),
  columnHelper.accessor('schedule', {
    id: 'schedule',
    size: 150,
    header: 'Schedule',
    cell: ({ row }) => <DateCell date={new Date(row.original.schedule)} />,
  }),
  columnHelper.accessor('created_at', {
    id: 'created_at',
    size: 150,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.created_at)} />,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 180,
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Badge renderAsDot color={getStatusColors(row.original.status)} />
        {row.original.status}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    size: 120,
    cell: (props) => {
      const { row, table } = props;
      const { meta } = table.options;

      return (
        <TableRowActionGroup
          deletePopoverTitle="Delete Contact"
          onDelete={() => {
            meta?.handleDeleteRow?.(row.original);
          }}
          editUrl={`/contacts/edit/${row.original.id}`} // Adjusted route for edit
          viewUrl={`/contacts/view/${row.original.id}`} // Adjusted route for view
          deletePopoverDescription={`Are you sure you want to delete contact #${row.original.id}?`}
        />
      );
    },
  }),
];
