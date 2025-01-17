'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useScrollableSlider } from '@core/hooks/use-scrollable-slider';
import { IconType } from 'react-icons/lib';
import {
  PiCalendarCheck,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCheckCircle,
  PiClock,
  PiPhoneSlash,
  PiArrowDownRight,
  PiArrowUpRight,
} from 'react-icons/pi';
import { usePlans } from '@/app/api/plan/usePlan';
import { useSubcription } from '@/app/api/plan/useSubcription';
import dayjs from 'dayjs';

type PosStatsType = {
  className?: string;
};

export type StatType = {
  id: number;
  duration: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  plan_id: number;
  user_id: string;
  price: number | null;
  order_id: string | null;
  transaction_id: string | null;
  gross_amount: number | null;
  payment_type: string | null;
  fraud_status: string | null;
  transaction_status: string | null;
  payment_date: string | null;
  last_updated: string;
  ai_response_used: number;
  mau_limit_topup: number;
  ai_response_topup: number;
  plans: {
    name: string;
    description: string;
  };
};

export type StatCardProps = {
  icon: IconType;
  className?: string;
  transaction: StatType;
};

export default function PosStats({ className }: PosStatsType) {
  const { data, isLoading } = useSubcription();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;

  const activeSubscriptions = (data ?? [])
    .map((item) => ({
      ...item,
      price: item.price ? Number(item.price) : null,
    }))
    .filter((item: StatType) => item.status === 'ACTIVE');

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <div className="w-full overflow-hidden">
        <div className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:h-0">
          <StatGrid stats={activeSubscriptions} />
        </div>
      </div>
    </div>
  );
}

export function StatGrid({ stats }: { stats: StatType[] }) {
  return (
    <>
      <StatCardPackage
        key={'stat-card-' + 3}
        icon={PiCalendarCheck}
        transaction={stats[0]}
        className="min-w-[300px]"
      />
      <StatCardMonthly
        key={'stat-card-' + 3}
        icon={PiCheckCircle}
        transaction={stats[0]}
        className="min-w-[300px]"
      />
      <StatCardAiResponse
        icon={PiClock}
        key={'stat-card-' + 3}
        transaction={stats[0]}
        className="min-w-[300px]"
      />
      <StatCardAdditionalAiResponse
        icon={PiPhoneSlash}
        key={'stat-card-' + 3}
        transaction={stats[0]}
        className="min-w-[300px]"
      />
    </>
  );
}

function StatCardPackage({ className, transaction, icon }: StatCardProps) {
  const {
    plans: { name, description },
    duration,
    status,
    start_date,
    end_date,
  } = transaction;
  const Icon = icon;

  return (
    <div
      className={cn(
        'group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          className={cn(
            'flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75] dark:text-gray-900 dark:group-first:bg-gray-900'
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
            Package Details
          </p>
          <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
            {duration}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1',
            status ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full px-2.5 py-1.5 group-first:bg-gray-0 dark:group-first:bg-gray-900 dark:group-first:text-green-700',
              status
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {status ? (
              <PiArrowUpRight className="h-auto w-4" />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none group-first:text-gray-0 dark:group-first:text-gray-900">
            {dayjs(end_date).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatCardMonthly({ className, transaction, icon }: StatCardProps) {
  const {
    plans: { name, description },
    duration,
    status,
    start_date,
    mau_limit_topup,
    end_date,
  } = transaction;
  const Icon = icon;

  return (
    <div
      className={cn(
        'group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          className={cn(
            'flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75] dark:text-gray-900 dark:group-first:bg-gray-900'
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
            Monthly Active User
          </p>
          <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
            {mau_limit_topup}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1',
            status ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full px-2.5 py-1.5 group-first:bg-gray-0 dark:group-first:bg-gray-900 dark:group-first:text-green-700',
              status
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {status ? (
              <PiArrowUpRight className="h-auto w-4" />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none group-first:text-gray-0 dark:group-first:text-gray-900">
            Reset Setiap Tanggal 1
          </span>
        </div>
      </div>
    </div>
  );
}
function StatCardAiResponse({ className, transaction, icon }: StatCardProps) {
  const {
    plans: { name, description },
    duration,
    status,
    start_date,
    ai_response_used,
    end_date,
  } = transaction;
  const Icon = icon;

  return (
    <div
      className={cn(
        'group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          className={cn(
            'flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75] dark:text-gray-900 dark:group-first:bg-gray-900'
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
            Ai Response
          </p>
          <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
            {ai_response_used} Used
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1',
            status ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full px-2.5 py-1.5 group-first:bg-gray-0 dark:group-first:bg-gray-900 dark:group-first:text-green-700',
              status
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {status ? (
              <PiArrowUpRight className="h-auto w-4" />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none group-first:text-gray-0 dark:group-first:text-gray-900">
            Reset Setiap Tanggal 1
          </span>
        </div>
      </div>
    </div>
  );
}
function StatCardAdditionalAiResponse({
  className,
  transaction,
  icon,
}: StatCardProps) {
  const {
    plans: { name, description },
    duration,
    status,
    ai_response_topup,
    start_date,
    end_date,
  } = transaction;
  const Icon = icon;

  return (
    <div
      className={cn(
        'group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          className={cn(
            'flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75] dark:text-gray-900 dark:group-first:bg-gray-900'
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
            Additional Ai Responses
          </p>
          <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
            {ai_response_topup} Responses
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1',
            status ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full px-2.5 py-1.5 group-first:bg-gray-0 dark:group-first:bg-gray-900 dark:group-first:text-green-700',
              status
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {status ? (
              <PiArrowUpRight className="h-auto w-4" />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none group-first:text-gray-0 dark:group-first:text-gray-900">
            Ai Response Permanent
          </span>
        </div>
      </div>
    </div>
  );
}
