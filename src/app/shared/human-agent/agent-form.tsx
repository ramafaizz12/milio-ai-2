'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Select, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import { addAgent } from 'libs/api-client/human';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  userFormSchema,
  UserFormInput,
} from '@/validators/create-agent.schema';
import toast from 'react-hot-toast';

export default function AgentForm() {
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    try {
      console.log('Submitted Data:', data);
      // Contoh API call
      const response = await addAgent(data); // Ganti dengan fungsi API Anda
      if (response.status == 201) {
        toast.success('Agent created successfully!');
        closeModal();
      } else {
        console.log('Failed to create agent');
        toast.error('Failed to create agent.');
      }
    } catch (error) {
      console.log('Submitted Error:', error);
      toast.error('Failed to create agent.');
    }
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
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({
          register,
          watch,
          control,
          formState: { errors, isSubmitting },
        }) => (
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

            <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
              <Button
                variant="outline"
                className="w-full @xl:w-auto dark:hover:border-gray-400"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button
                isLoading={isSubmitting}
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
