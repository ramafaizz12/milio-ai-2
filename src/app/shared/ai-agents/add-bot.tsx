'use client';

import toast from 'react-hot-toast';
import { useState } from 'react';
import { metaStartDialog } from 'libs/api-client/connected-platform';

export default function AddBot() {
  const [isLoading, setIsLoading] = useState(false);
  const handleAddPlatform = async () => {
    setIsLoading(true);
    try {
      const response = await metaStartDialog();
      if (response.status === 200) {
        window.open(
          response.data.oauthUrl,
          '_blank',
          'width=600,height=700,scrollbars=yes'
        );
      } else {
        toast.error('Failed to add platform!');
      }
    } catch (error) {
      toast.error('An error occurred while adding the platform.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:bg-gray-50">
      <div
        className="w-45 flex h-full cursor-pointer flex-col items-center justify-center rounded-lg bg-blue-500 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        onClick={handleAddPlatform}
      >
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-500">
          {isLoading ? <span className="animate-spin">🔄</span> : '+'}
        </div>
        <p className="text-sm font-medium text-white">Create New</p>
      </div>
    </div>
  );
}
