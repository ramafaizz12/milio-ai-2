'use client';

import { Input, Button } from 'rizzui';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
  bot_id: string;
  agent_id: string;
  platform_name: string;
  supervisor_id: string;
}

export function PlatformInputForm({
  onSubmit,
  defaultValues,
  isLoading,
}: {
  onSubmit: SubmitHandler<FormInputs>;
  defaultValues?: Partial<FormInputs>;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Bot ID Input */}
      <Input
        label="Bot ID"
        placeholder="Enter Bot ID..."
        {...register('bot_id', { required: 'Bot ID is required' })}
        error={errors.bot_id?.message}
      />

      {/* Agent ID Input */}
      <Input
        label="Agent ID"
        placeholder="Enter Agent ID..."
        {...register('agent_id', { required: 'Agent ID is required' })}
        error={errors.agent_id?.message}
      />

      {/* Platform Name Input */}
      <Input
        label="Platform Name"
        placeholder="Enter Platform Name..."
        {...register('platform_name', {
          required: 'Platform Name is required',
        })}
        error={errors.platform_name?.message}
      />

      {/* Supervisor ID Input */}
      <Input
        label="Supervisor ID"
        placeholder="Enter Supervisor ID..."
        {...register('supervisor_id', {
          required: 'Supervisor ID is required',
        })}
        error={errors.supervisor_id?.message}
      />

      <Button type="submit" isLoading={isLoading} className="mt-4">
        Submit
      </Button>
    </form>
  );
}
