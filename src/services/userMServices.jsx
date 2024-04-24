import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from 'config/axiosConfig';

export const useGetUsers = (enabled) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => axiosInstance.get(`/user/list`),
    enabled: enabled
  });

  return { data, isSuccess, isError, isLoading };
};

export const useCreateUsers = (vendor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.post(`/user/insert/`, vendor),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useUpdateUser = (vendor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.put(`/user/update/`, vendor),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useBatchDeleteUsers = (vendorIds) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axiosInstance({
        method: 'delete',
        url: `/user/delete`,
        data: { ids: vendorIds }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};
