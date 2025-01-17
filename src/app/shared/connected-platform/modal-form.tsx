'use client';

import { useState } from 'react';
import { ActionIcon, Button, cn, Input, Modal, Title } from 'rizzui';

import { toast } from 'react-hot-toast';
import { PlatformInputForm } from './form-input';
import { PiXBold } from 'react-icons/pi';

export function PlatformModal({
  className,
  isOpen,
  onClose,
}: {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      console.log('Submitted Data:', data);
      toast.success('Platform data submitted successfully!');
      setIsLoading(false);
      onClose(); // Close modal after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit data');
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('max-w-full rounded-md p-6', className)}>
      <div className="flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Update Platform
        </Title>
        <ActionIcon variant="text" onClick={() => onClose}>
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <PlatformInputForm
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          defaultValues={{
            bot_id: '',
            agent_id: '',
            platform_name: '',
            supervisor_id: '',
          }}
        />
      </Modal>
    </div>
  );
}
