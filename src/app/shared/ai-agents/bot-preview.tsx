'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActionIcon, Button, Input, Modal, Select, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { botData } from '@/data/bot-data';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function ConnectedPreview({
  icon,
  bot,
  title = 'Newsletter!',
  preview,
  className,
  description = 'Feel free to preview it by clicking the button below.',
}: {
  icon: StaticImport;
  title?: string;
  bot?: (typeof botData.data)[0];
  preview: string;
  className?: string;
  description?: string;
}) {
  const bots = bot;

  return (
    <div
      className={cn(
        className,
        'rounded-2xl border border-gray-100 bg-white @container dark:bg-gray-50'
      )}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 @2xl:p-12 3xl:px-16 4xl:px-28">
        <div className="w-full max-w-[640px]">
          <div className="relative mx-auto mb-6 h-20 w-20 @2xl:mb-8 @2xl:h-28 @2xl:w-28">
            <Image
              src={icon}
              alt="newsletter"
              fill
              priority
              sizes="(max-width: 768px) 140px"
            />
          </div>
          <div className="mb-8 text-center @2xl:mb-12">
            <h2 className="mb-2 text-xl @2xl:mb-3 @2xl:text-2xl">{title}</h2>
            <p className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base">
              {description}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              href={{
                pathname: '/ai-agent/detail-page',
                query: { id: bot?.id },
              }}
            >
              <Button as="span" size="lg" className="w-auto">
                Update
              </Button>
            </Link>
            <Button
              as="span"
              size="lg"
              variant="outline"
              className="w-auto border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              // onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
