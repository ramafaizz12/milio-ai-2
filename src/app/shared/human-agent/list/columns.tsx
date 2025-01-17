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
  // columnHelper.accessor('phone', {
  //   id: 'phone',
  //   size: 150,
  //   header: 'Phone Number',
  //   cell: ({ row }) => (
  //     <Link
  //       href={`/contacts/${row.original.id}`} // Adjusted route for contacts
  //       className="duration-200 hover:text-gray-900 hover:underline"
  //     >
  //       {row.original.phone}
  //     </Link>
  //   ),
  // }),
  // columnHelper.accessor('created_at', {
  //   id: 'created_at',
  //   size: 150,
  //   header: 'Created At',
  //   cell: ({ row }) => <DateCell date={new Date(row.original.created_at)} />,
  // }),
  columnHelper.accessor('display_name', {
    id: 'display_name',
    size: 250,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => `${row.original.display_name}`,
  }),
  columnHelper.accessor('role_name', {
    id: 'role_name',
    size: 200,
    header: 'Agent Role',
    cell: ({ row }) => `${row.original.role_name}`,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 200,
    header: 'Email',
    cell: ({ row }) => row.original.email,
  }),

  columnHelper.display({
    id: 'actions',
    size: 120,
    cell: (props) => {
      const { row, table } = props;
      const { meta } = table.options;

      return (
        <TableRowActionGroup
          deletePopoverTitle="Delete Agent"
          onDelete={() => {
            meta?.handleDeleteRow?.(row.original);
          }}
          editUrl={`/contacts/edit/${row.original.user_id}`} // Adjusted route for edit
          deletePopoverDescription={`Are you sure you want to delete agent${row.original.display_name}?`}
        />
      );
    },
  }),
];
