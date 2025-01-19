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
    size: 150,
    header: 'Receipent List Name',
    cell: ({ row }) => (
      <Link
        href={`/contacts/${row.original.id}`} // Adjusted route for contacts
        className="duration-200 hover:text-gray-900 hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  }),
  columnHelper.accessor('created_at', {
    id: 'created_at',
    size: 150,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.created_at)} />,
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
