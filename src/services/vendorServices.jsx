import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetVendors = (enabled) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => axiosInstance.get(`/vendors/list`),
    enabled: enabled
  });

  return { data, isSuccess, isError, isLoading };
};

export const useCreateVendor = (vendor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.post(`/vendors/insert/`, vendor),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useUpdateVendor = (vendor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.put(`/vendors/update/`, vendor),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useBatchDeleteVendors = (vendorIds) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axiosInstance({
        method: 'delete',
        url: `/vendor/delete`,
        data: { ids: vendorIds }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};
