'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Select, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  userFormSchema,
  UserFormInput,
} from '@/validators/create-agent.schema';
import toast from 'react-hot-toast';
import { useCreateAgent } from '@/app/api/agent/useAgent';
import { useDivisions } from '@/app/api/businesses/useDivisions';
import { useTeams } from '@/app/api/businesses/useTeams';

export default function AgentForm() {
  const { closeModal } = useModal();
  const { data: divisionsapi } = useDivisions();
  const { data: teamsapi } = useTeams();
  const { mutate, isPending } = useCreateAgent();

  const divisions =
    divisionsapi?.divisions.map((division) => ({
      value: division.id.toString(),
      label: division.name,
    })) || [];

  const teams =
    teamsapi?.teams.map((team) => ({
      value: team.id,
      label: team.name,
    })) || [];

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    console.log('Submitted Data:', data);
    mutate(data, {
      onSuccess: () => {
        toast.success('Agent created successfully!');
        closeModal();
      },
      onError: (error: any) => {
        console.error('Mutation Error:', error);
        toast.error(error?.message || 'Failed to create agent.');
      },
    });
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Create a new agent
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <Form<UserFormInput>
        validationSchema={userFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'Agent',
            divisionId: '',
            teamId: '',
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <Input
              label="Agent Name"
              placeholder="Enter agent's name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />

            <Input
              label="Agent Email"
              placeholder="Enter agent's email"
              {...register('email')}
              className="col-span-full"
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="text"
              placeholder="Enter a secure password"
              {...register('password')}
              className="col-span-full"
              error={errors.password?.message}
            />

            <Controller
              control={control}
              name="role"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Role"
                  options={[
                    { label: 'Agent', value: 'Agent' },
                    { label: 'Supervisor', value: 'Supervisor' },
                    { label: 'Admin', value: 'Admin' },
                  ]}
                  value={value}
                  onChange={(selected: { value: string }) => {
                    console.log('MultiSelect changed:', selected);
                    onChange(selected.value);
                  }}
                  labelClassName="font-medium text-gray-900 dark:text-white"
                  dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                />
              )}
            />
            <Controller
              control={control}
              name="divisionId"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Division"
                  options={divisions}
                  value={value}
                  onChange={(selected: { value: string }) => {
                    console.log('MultiSelect changed:', selected);
                    onChange(selected.value);
                  }}
                  labelClassName="font-medium text-gray-900 dark:text-white"
                  dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                  error={errors.divisionId?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="teamId"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Team"
                  options={divisions}
                  value={value}
                  onChange={(selected: { value: string }) => {
                    console.log('MultiSelect changed:', selected);
                    onChange(selected.value);
                  }}
                  labelClassName="font-medium text-gray-900 dark:text-white"
                  dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                  error={errors.teamId?.message}
                />
              )}
            />

            <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
              <Button
                variant="outline"
                className="w-full @xl:w-auto dark:hover:border-gray-400"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button
                isLoading={isPending}
                type="submit"
                className="hover:gray-700 w-full @xl:w-auto"
              >
                Save
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
