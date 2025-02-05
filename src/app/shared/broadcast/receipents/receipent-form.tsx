'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Select, MultiSelect, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import toast from 'react-hot-toast';
import { createReceipents } from 'libs/api-client/broadcast';
import { useContacts } from '@/app/api/contact/useContact';
import { usePlatform } from '@/app/api/platform/usePlatform';
import * as z from 'zod';
import { useModal } from '../../modal-views/use-modal';

// Validasi schema
const receipentFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  platform_id: z.string().min(1, 'Platform is required'),
  contact_ids: z
    .array(z.string().min(1))
    .nonempty('At least one contact is required'),
});

type ReceipentFormInput = z.infer<typeof receipentFormSchema>;

export default function ReceipentForm() {
  const { closeModal } = useModal();
  const { data: platformapi } = usePlatform();
  const { data: contactsapi } = useContacts();

  const platforms =
    platformapi?.data.map((platform) => ({
      value: platform.id.toString(),
      label: platform.platform_name,
    })) || [];

  const contacts =
    contactsapi?.map((contact) => ({
      value: contact.id,
      label: contact.name,
    })) || [];

  const onSubmit: SubmitHandler<ReceipentFormInput> = async (data) => {
    try {
      console.log('Submitted Data:', data);
      const response = await createReceipents(data);
      if (response.status === 201) {
        toast.success('Recipient list created successfully!');
        console.log(response.data);
        closeModal();
      } else {
        toast.error('Failed to create recipient list.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('An error occurred while creating the recipient list.');
    }
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Create a new recipient list
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

      <Form<ReceipentFormInput>
        validationSchema={receipentFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            name: '',
            platform_id: '',
            contact_ids: [],
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({
          register,
          control,
          watch,
          formState: { errors, isSubmitting },
        }) => {
          return (
            <>
              <Input
                label="List Name"
                placeholder="Enter list name"
                {...register('name')}
                className="col-span-full"
                error={errors.name?.message}
              />

              <Controller
                control={control}
                name="platform_id"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="Platform"
                    options={platforms}
                    value={value}
                    onChange={(selected: { value: string }) => {
                      console.log('MultiSelect changed:', selected);
                      onChange(selected.value);
                    }}
                    labelClassName="font-medium text-gray-900 dark:text-white"
                    dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                    error={errors.platform_id?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="contact_ids"
                render={({ field: { value, onChange } }) => (
                  <MultiSelect
                    label="Contacts"
                    options={contacts}
                    value={value}
                    onChange={(selected) => {
                      console.log('MultiSelect changed:', selected);
                      onChange(selected);
                    }}
                    labelClassName="font-medium text-gray-900 dark:text-white"
                    dropdownClassName="p-2 gap-1 grid !z-[10] h-auto"
                    error={errors.contact_ids?.message}
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
          );
        }}
      </Form>
    </div>
  );
}
