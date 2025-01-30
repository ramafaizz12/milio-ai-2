'use client';

import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { shipmentListColumns } from './columns';
import { Box } from 'rizzui';
import { exportToCSV } from '@core/utils/export-to-csv';
import { useAgent } from '@/app/api/agent/useAgent';
import { useMemo } from 'react';

export type ShipmentListTableDataType = {
  user_id: string;
  role_id: string;
  role_name: string;
  email: string;
  display_name: string;
  admin_id: string;
};

export default function ShipmentListTable() {
  const { data, isLoading, isError } = useAgent();

  // Pastikan Hooks dipanggil di luar kondisi
  const combinedList = useMemo(() => {
    if (!data || !data.agents) return [];
    return [...(data.agents.Supervisor || []), ...(data.agents.Agent || [])];
  }, [data]);

  const { table, setData } = useTanStackTable<ShipmentListTableDataType>({
    tableData: combinedList, // Pastikan defaultnya selalu []
    columnConfig: shipmentListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.user_id !== row.id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    [table]
  );

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Name,Phone,ChatStatus,CreatedAt,PlatformID',
      `contacts_data_${selectedData.length}`
    );
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError || combinedList.length === 0)
    return <p>No connected platforms found.</p>;

  return (
    <Box>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} onExport={handleExportData} />
      <TablePagination table={table} className="py-4" />
    </Box>
  );
}
