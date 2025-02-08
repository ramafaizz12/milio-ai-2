'use client';

import { useState } from 'react';
import Link from 'next/link';
import logowa from '@public/wa-bisnis.svg';
// import { metaStartDialog } from 'libs/api-client/connected-platform';

export default function SelectPlatform() {
  const platforms = [
    {
      name: 'Whatsapp',
      description: 'Upgrade to use this feature',
      icon: logowa, // Ganti path sesuai dengan ikon Anda
      disabled: false,
    },
    {
      name: 'Messenger',
      description: '',
      icon: '/icons/messenger.png',
      disabled: true,
    },
    {
      name: 'Instagram',
      description: 'Upgrade to use this feature',
      icon: '/icons/instagram.png',
      disabled: true,
    },
    {
      name: 'Web Livechat',
      description: '',
      icon: '/icons/livechat.png',
      disabled: false,
    },
    {
      name: 'Tokopedia',
      description: 'Upgrade to use this feature',
      icon: '/icons/tokopedia.png',
      disabled: true,
    },
  ];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Select your Platform</h1>
      <p className="mb-8 text-center text-gray-600">
        Select the platform you wish to establish your new inbox.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center rounded-lg border p-4 shadow-md ${
              platform.disabled ? 'bg-gray-100 opacity-50' : 'bg-white'
            }`}
          >
            <img
              src={platform.icon}
              alt={platform.name}
              className="mb-4 h-16 w-16"
            />
            <h3 className="text-lg font-semibold">{platform.name}</h3>
            {platform.description && (
              <p className="mt-2 text-sm text-red-500">
                {platform.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
