import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = `http://localhost:8000/vendors`;

export const useGetVendors = (enabled) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => await axios.get(`${BASE_URL}/list`),
    enabled: enabled
  });

  return { data, isSuccess, isError, isLoading };
};

export const useCreateVendor = (vendor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`${BASE_URL}/insert/`, vendor),
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
    mutationFn: () => axios.put(`${BASE_URL}/update/`, vendor),
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
