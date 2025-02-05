'use client';

import { SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import { createBot } from 'libs/api-client/chatbot';
import { useCreateBot } from '@/app/api/chatbot/useBot';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import {
  addAIFormSchema,
  AddaiFormInput,
} from '@/validators/create-bot.schema';

export default function AiForm() {
  const { closeModal } = useModal();
  const { mutate, isPending } = useCreateBot();

  const onSubmit: SubmitHandler<AddaiFormInput> = (data) => {
    console.log('Submitted Data:', data);

    mutate(data, {
      onSuccess: () => {
        toast.success('Bot created successfully!');
        closeModal();
      },
      onError: (error: any) => {
        console.error('Mutation Error:', error);
        toast.error(error?.message || 'Failed to create bot.');
      },
    });
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Create a new bot
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

      <Form<AddaiFormInput>
        validationSchema={addAIFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            name: '',
            description: '',
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({
          register,

          watch,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <Input
              label="Bot Name"
              placeholder="Enter bot name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />

            <Input
              label="Description"
              placeholder="Enter description"
              {...register('description')}
              className="col-span-full"
              error={errors.description?.message}
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
