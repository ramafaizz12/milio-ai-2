'use client';
import { useEffect, useMemo } from 'react';
import { useTemplates } from '@/app/api/broadcast/useTemplates';
import { useReceipents } from '@/app/api/broadcast/useReceipents';
import { useContacts } from '@/app/api/contact/useContact';
import { usePlans } from '@/app/api/plan/usePlan';
import { usePlatform } from '@/app/api/platform/usePlatform';
import { useCampaign } from '@/app/api/broadcast/useCampaign';
import { useAgent } from '@/app/api/agent/useAgent';
import { useDivisions } from '@/app/api/businesses/useDivisions';
import { useTeams } from '@/app/api/businesses/useTeams';
import { useBusinesses } from '@/app/api/businesses/useBusinesses';
import { useBot } from '@/app/api/chatbot/useBot';
import { useFilteredPlans } from '@/app/api/plan/usePlan';
import toast from 'react-hot-toast';

export default function FetchDataDashboard() {
  const { isLoading: loadingTemplate, isError: errorTemplate } = useTemplates();
  const { isLoading: loadingReceipent, isError: errorReceipent } =
    useReceipents();
  const { isLoading: loadingPlans, isError: errorPlans } = usePlans();
  const { isLoading: loadingBots, isError: errorBots } = useBot();
  const { isLoading: loadingFilteredPlan, isError: errorFilteredPlan } =
    useFilteredPlans();
  const { isLoading: loadingCampaign, isError: errorCampaign } = useCampaign();
  const { isLoading: loadingPlatform, isError: errorPlatform } = usePlatform();
  const { isLoading: loadingContacts, isError: errorContacts } = useContacts();
  const { isLoading: loadingAgents, isError: errorAgents } = useAgent();
  const { isLoading: loadingDivisions, isError: errorDivisions } =
    useDivisions();
  const { isLoading: loadingBusinesses, isError: errorBusinesses } =
    useBusinesses();
  const { isLoading: loadingTeams, isError: errorTeams } = useTeams();
  const isLoading = useMemo(
    () =>
      loadingTemplate ||
      loadingBots ||
      loadingPlans ||
      loadingReceipent ||
      loadingFilteredPlan ||
      loadingPlatform ||
      loadingTeams ||
      loadingDivisions ||
      loadingBusinesses ||
      loadingContacts ||
      loadingCampaign ||
      loadingAgents,
    [
      loadingTemplate,
      loadingReceipent,
      loadingPlans,
      loadingBots,
      loadingTeams,
      loadingBusinesses,
      loadingDivisions,
      loadingFilteredPlan,
      loadingPlatform,
      loadingContacts,
      loadingCampaign,
      loadingAgents,
    ]
  );

  const isError = useMemo(
    () =>
      errorTemplate ||
      errorBots ||
      errorPlans ||
      errorReceipent ||
      errorFilteredPlan ||
      errorPlatform ||
      errorBusinesses ||
      errorDivisions ||
      errorTeams ||
      errorCampaign ||
      errorContacts ||
      errorAgents,
    [
      errorTemplate,
      errorBots,
      errorPlans,
      errorDivisions,
      errorTeams,
      errorBusinesses,
      errorReceipent,
      errorFilteredPlan,
      errorPlatform,
      errorCampaign,
      errorContacts,
      errorAgents,
    ]
  );

  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading Fetch Data', { id: 'fetching' });
    } else {
      toast.dismiss('fetching');
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      toast.error('Error Fetching Data');
    }
  }, [isError]);

  return null;
}
