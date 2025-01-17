'use client';

import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActionIcon, Button, Input, Modal, Select, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { agentData } from '@/data/agent-data';
import { botData } from '@/data/bot-data';
import { PiXBold } from 'react-icons/pi';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { folders } from '@/data/snippets-and-templates';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const bots = bot?.data;
  const agents = data?.agents.Agent;
  const superVisor = data?.agents.Supervisor;

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      agent: '',
      supervisor: '',
      bot: '',
    },
  });

  const handleUpdateClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onSubmit: SubmitHandler<{ name: string; description: string }> = (
    data
  ) => {
    console.log('Form Data:', data);
    toast.success('Form submitted successfully!');
    handleCloseDialog();
  };

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
          <Button
            as="span"
            size="lg"
            className="mx-auto w-full"
            onClick={handleUpdateClick}
          >
            Update
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn('max-w-full rounded-md p-6', className)}
        >
          <div className="flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Update
            </Title>
            <ActionIcon variant="text" onClick={() => handleCloseDialog()}>
              <PiXBold className="h-5 w-5" />
            </ActionIcon>
          </div>

          {/* Input Field */}
          <Input
            label={`Platform Name`}
            placeholder={`Enter your Platform name`}
            labelClassName="font-medium text-gray-900 dark:text-white capitalize"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="agent"
            render={({ field: { value, onChange } }) => (
              <Select
                label="Agent"
                inPortal={false}
                labelClassName="font-medium text-gray-900 dark:text-white"
                dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                value={value}
                onChange={onChange}
                options={
                  agents?.map((agent: any) => ({
                    label: agent.display_name, // Sesuaikan properti `name` dengan API Anda
                    value: agent.user_id, // Sesuaikan properti `id` dengan API Anda
                  })) ?? []
                }
                getOptionValue={(option) => option.value}
                displayValue={(selected: string) =>
                  agents?.find((agent: any) => agent.user_id === selected)
                    ?.display_name ?? ''
                }
              />
            )}
          />

          <Controller
            control={control}
            name="supervisor"
            render={({ field: { value, onChange } }) => (
              <Select
                label="Supervisor"
                inPortal={false}
                labelClassName="font-medium text-gray-900 dark:text-white"
                dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                value={value}
                onChange={onChange}
                options={
                  superVisor?.map((supervisor: any) => ({
                    label: supervisor.display_name, // Sesuaikan properti `name` dengan API Anda
                    value: supervisor.user_id, // Sesuaikan properti `id` dengan API Anda
                  })) ?? []
                }
                getOptionValue={(option) => option.value}
                displayValue={(selected: string) =>
                  superVisor?.find(
                    (supervisor: any) => supervisor.user_id === selected
                  )?.display_name ?? ''
                }
              />
            )}
          />

          <Controller
            control={control}
            name="bot"
            render={({ field: { value, onChange } }) => (
              <Select
                label="Bot"
                inPortal={false}
                labelClassName="font-medium text-gray-900 dark:text-white"
                dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                value={value}
                onChange={onChange}
                options={
                  bots?.map((bots: any) => ({
                    label: bots.name, // Sesuaikan properti `name` dengan API Anda
                    value: bots.id, // Sesuaikan properti `id` dengan API Anda
                  })) ?? []
                }
                getOptionValue={(option) => option.value}
                displayValue={(selected: string) =>
                  bots?.find((f) => f.id === selected)?.name ?? ''
                }
                // error={errors?.folder?.message as string}
              />
            )}
          />
          {/* Submit Button */}
          <div className="col-span-full mt-2 flex items-center justify-end">
            <Button type="submit" className="capitalize">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
