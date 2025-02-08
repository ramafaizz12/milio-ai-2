'use client';

import { SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import toast from 'react-hot-toast';
import { useCreateBusinesses } from '@/app/api/businesses/useBusinesses';
import * as z from 'zod';
import { useModal } from '../../modal-views/use-modal';

// Validasi schema
const organizationFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type ReceipentFormInput = z.infer<typeof organizationFormSchema>;

export default function OrganizationForm() {
  const { closeModal } = useModal();
  const { mutate, isPending } = useCreateBusinesses();

  const onSubmit: SubmitHandler<ReceipentFormInput> = async (data) => {
    console.log('Submitted Data:', data);

    mutate(data, {
      onSuccess: () => {
        toast.success('Businesses created successfully!');
        closeModal();
      },
      onError: (error: any) => {
        console.error('Mutation Error:', error);
        toast.error(error?.message || 'Failed to create businesses.');
      },
    });
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Create a businesses
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
        validationSchema={organizationFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            name: '',
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({
          register,

          formState: { errors },
        }) => {
          return (
            <>
              <Input
                label="Business Name"
                placeholder="Enter business name"
                {...register('name')}
                className="col-span-full"
                error={errors.name?.message}
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
          );
        }}
      </Form>
    </div>
  );
}
