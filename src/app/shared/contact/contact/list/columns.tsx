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
  columnHelper.accessor('phone', {
    id: 'phone',
    size: 150,
    header: 'Phone Number',
    cell: ({ row }) => (
      <Link
        href={`/contacts/${row.original.id}`} // Adjusted route for contacts
        className="duration-200 hover:text-gray-900 hover:underline"
      >
        {row.original.phone}
      </Link>
    ),
  }),
  columnHelper.accessor('created_at', {
    id: 'created_at',
    size: 150,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.created_at)} />,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 250,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard src={row.original.avatar} name={row.original.name} />
    ),
  }),
  columnHelper.accessor('platform_id', {
    id: 'platform_id',
    size: 200,
    header: 'Platform ID',
    cell: ({ row }) => `Platform #${row.original.platform_id}`,
  }),
  // columnHelper.accessor('bot_id', {
  //   id: 'bot_id',
  //   size: 200,
  //   header: 'Bot ID',
  //   cell: ({ row }) => row.original.bot_id,
  // }),
  columnHelper.accessor('chat_status', {
    id: 'chat_status',
    size: 180,
    header: 'Chat Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Badge renderAsDot color={getStatusColors(row.original.chat_status)} />
        {row.original.chat_status}
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
