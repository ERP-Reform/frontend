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
    onSuccess: (createdVendor) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { data } = createdVendor?.data;
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      });
      queryClient.setQueryData([`vendor`, { id: data.id }], data);
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
    onSuccess: (createdVendor) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { data } = createdVendor?.data;
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      });
      queryClient.setQueryData([`vendor`, { id: data.id }], data);
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useBatchDeleteVendors = (vendorIds) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.put(`/vendors/update/`, vendorIds),
    onSuccess: () => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};
