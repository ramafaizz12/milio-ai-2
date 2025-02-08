'use client';
import { useEffect } from 'react';
import { useModal } from '../../modal-views/use-modal';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import OrganizationForm from './form-organization';

const openOrganizationAtom = atomWithStorage('openorganization', true);

export default function OpenFormOrganization() {
  const { openModal } = useModal();
  const [openForm, setOpenForm] = useAtom(openOrganizationAtom);

  useEffect(() => {
    if (openForm) {
      openModal({ view: <OrganizationForm /> });
      setTimeout(() => setOpenForm(false), 0); // Mencegah re-render langsung
    }
  }, [openForm]); // Pastikan efek hanya berjalan saat `openForm` berubah

  return null;
}
