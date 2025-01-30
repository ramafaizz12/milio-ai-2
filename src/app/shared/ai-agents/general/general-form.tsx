'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Button, Input, Title } from 'rizzui';
import { Form } from '@core/ui/form';
import { UpdateBot } from 'libs/api-client/chatbot';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { useSearchParams } from 'next/navigation';

// Schema validasi menggunakan Zod
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  tone: z.string().min(1, 'Tone is required'),
  goals_behavior: z.string().min(1, 'Goals behavior is required'),
  human_handover: z.object({
    condition: z.string().min(1, 'Condition is required'),
    keywords: z
      .array(z.string().min(1))
      .nonempty('At least one keyword is required'),
  }),
});

type FormInput = z.infer<typeof formSchema>;

export default function GeneralForm() {
  const router = useSearchParams();
  const id = router.get('id');

  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      console.log('Submitted Data:', data);
      if (id) {
        const response = await UpdateBot(id, data);
        if (response.status === 200) {
          toast.success('Bot Update Sukses!');
        } else {
          toast.error('Failed to Update bot.');
        }
      } else {
        toast.error('Invalid bot ID.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('An error occurred while creating the recipient list.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:px-7 md:py-10">
      <div className="mb-6">
        <Title as="h3" className="text-lg">
          Update Bot
        </Title>
      </div>

      <Form<FormInput>
        validationSchema={formSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            name: 'Motor',
            description: 'deskripsi baru',
            tone: 'Friendly',
            goals_behavior: 'Improve user retention',
            human_handover: {
              condition: 'asdsad',
              keywords: ['angry'],
            },
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({
          register,
          watch,
          setValue,
          getValues,
          formState: { errors, isSubmitting },
        }) => {
          const formValues = watch(); // Watch semua nilai form
          console.log('Form Values:', formValues);

          const handleAddKeyword = () => {
            if (
              keywordInput.trim() &&
              !keywords.includes(keywordInput.trim())
            ) {
              setKeywords((prev) => [...prev, keywordInput.trim()]);
              setKeywordInput('');
              toast.success(`Keyword "${keywordInput.trim()}" added!`);
            } else {
              toast.error('Keyword is either empty or already exists!');
            }
          };

          const handleRemoveKeyword = (keywordToRemove: string) => {
            setKeywords((prev) =>
              prev.filter((keyword) => keyword !== keywordToRemove)
            );
            toast.success(`Keyword "${keywordToRemove}" removed!`);
          };

          return (
            <>
              {/* Simple Fields */}
              <Input
                label="Name"
                placeholder="Enter name"
                {...register('name')}
                error={errors.name?.message}
                className="col-span-full"
              />

              <Input
                label="Description"
                placeholder="Enter description"
                {...register('description')}
                error={errors.description?.message}
                className="col-span-full"
              />

              <Input
                label="Tone"
                placeholder="Enter tone (e.g., Friendly)"
                {...register('tone')}
                error={errors.tone?.message}
              />

              <Input
                label="Goals Behavior"
                placeholder="Enter goals behavior"
                {...register('goals_behavior')}
                error={errors.goals_behavior?.message}
              />

              {/* Nested Field: human_handover */}
              <Input
                label="Handover Condition"
                placeholder="Enter condition"
                {...register('human_handover.condition')}
                error={errors.human_handover?.condition?.message}
                className="col-span-full"
              />

              {/* Keywords Input */}
              <div className="col-span-full">
                <label className="font-medium">Keywords</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a keyword (e.g., Angry)"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                  />
                  <Button onClick={() => handleAddKeyword()} className="px-4">
                    Add
                  </Button>
                </div>
                <div>
                  <h4 className="mb-2 mt-3 font-medium text-gray-900 dark:text-white">
                    Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-gray-800"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  {keywords.length === 0 && (
                    <p className="text-gray-500">No keywords added yet.</p>
                  )}
                </div>
              </div>
              {/* Buttons */}
              <div className="col-span-full grid grid-cols-2 gap-4 pt-5">
                <Button
                  variant="outline"
                  className="w-full @xl:w-auto dark:hover:border-gray-400"
                  type="button"
                  onClick={() => toast('Cancelled')}
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
