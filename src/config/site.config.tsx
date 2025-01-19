import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import logonew from '@public/Frame 10.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Milio AI - Chatbot for Business',
  description: `Chatbot for Business - Milio AI is a chatbot platform that helps businesses to automate customer support, marketing, and sales.`,
  logo: logonew,
  icon: logonew,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title
      ? `${title} - Milio AI - Chatbot for Business`
      : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Milio AI - Chatbot for Business` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Milio AI', // https://developers.google.com/search/docs/appearance/site-names
      // images: {
      //   url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
      //   width: 1200,
      //   height: 630,
      // },
      locale: 'en_US',
      type: 'website',
    },
  };
};
