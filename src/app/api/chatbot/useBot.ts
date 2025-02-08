import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getBot,
  createBot,
  UpdateBot,
  deleteBot,
  trainBot,
} from 'libs/api-client/chatbot';

export const useBot = () => {
  return useQuery({
    queryFn: async () => getBot(),
    queryKey: ['bots'],
  });
};

export function useCreateBot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBot,

    onSuccess: () => {
      // Refresh daftar bot setelah berhasil membuat
      queryClient.invalidateQueries({ queryKey: ['bots'] });
    },
  });
}

// export function useUpdateBot() {
//   const queryClient = useQueryClient();

//   return useMutation(UpdateBot, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['bots']);
//     },
//   });
// }

// export function useDeleteBot() {
//   const queryClient = useQueryClient();

//   return useMutation(deleteBot, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['bots']);
//     },
//   });
// }

// export function useTrainBot() {
//   return useMutation(trainBot);
// }
