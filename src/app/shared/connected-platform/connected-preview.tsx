'use client';

import Image from 'next/image';
import cn from '@core/utils/class-names';
import { agentData } from '@/data/agent-data';
import { botData } from '@/data/bot-data';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import ModalButton from '../modal-button';
import UpdatePlatformForm from './modal-form';

export type PlatformData = {
  id: number;
  platform_name: string;
  platform_type: string;
  platform_account_id: string;
  phone_number_id: string;
  status: string;
  created_at: string;
};

export default function ConnectedPreview({
  icon,
  data,
  bot,
  title = 'Newsletter!',
  preview,
  className,
  description = 'Feel free to preview it by clicking the button below.',
}: {
  icon: StaticImport;
  title?: string;
  data?: typeof agentData;
  bot?: typeof botData;
  preview: string;
  className?: string;
  description?: string;
}) {
  const bots = bot?.data;
  const agents = data?.agents.Agent;
  const superVisor = data?.agents.Supervisor;

  return (
    <div
      className={cn(
        className,
        'rounded-2xl border border-gray-100 bg-white @container dark:bg-gray-50'
      )}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 @2xl:p-12 3xl:px-16 4xl:px-28">
        <div className="w-full max-w-[640px]">
          <div className="relative mx-auto mb-6 h-20 w-20 @2xl:mb-8 @2xl:h-28 @2xl:w-28">
            <Image
              src={icon}
              alt="newsletter"
              fill
              priority
              sizes="(max-width: 768px) 140px"
            />
          </div>
          <div className="mb-8 text-center @2xl:mb-12">
            <h2 className="mb-2 text-xl @2xl:mb-3 @2xl:text-2xl">{title}</h2>
            <p className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base">
              {description}
            </p>
          </div>
          <ModalButton
            label="Update"
            view={<UpdatePlatformForm />}
            customSize="500px"
            className="mb-3 mt-0 h-auto w-full @lg:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
