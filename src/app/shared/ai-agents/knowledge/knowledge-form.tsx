'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import { Button, Title } from 'rizzui';
import { Form } from '@core/ui/form';
import toast from 'react-hot-toast';
import * as z from 'zod';

// Schema validasi menggunakan Zod
const formSchema = z.object({
  file: z.any().refine((file) => file && file.length > 0, 'File is required'),
});

type FormInput = z.infer<typeof formSchema>;

export default function KnowledgeForm() {
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const file = data.file[0]; // Mendapatkan file pertama dari array
    console.log('Uploaded File:', file);

    try {
      // Lakukan pengolahan file (misalnya mengunggah ke server)
      console.log('Submitted Data:', data);
      toast.success('Form submitted successfully!');
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:px-7 md:py-10">
      <div className="mb-6">
        <Title as="h3" className="text-lg">
          Training Bot
        </Title>
      </div>

      <Form<FormInput>
        validationSchema={formSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            file: null,
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({ control, formState: { errors, isSubmitting } }) => {
          return (
            <>
              {/* File Upload Input */}
              <div className="col-span-full">
                <label className="mb-2 block font-medium text-gray-900 dark:text-white">
                  Upload File
                </label>
                <Controller
                  control={control}
                  name="file"
                  render={({ field }) => (
                    <input
                      type="file"
                      accept=".pdf,.txt,.csv" // Batasi tipe file jika diperlukan
                      {...field}
                      onChange={(e) => field.onChange(e.target.files)} // Tangkap file input
                      className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    />
                  )}
                />
                {errors.file && (
                  <p className="mt-1 text-sm text-red-500">
                    {typeof errors.file?.message === 'string' &&
                      errors.file.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-full">
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  className="hover:gray-700 mt-6 w-full @xl:w-full"
                >
                  Train File
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
}
