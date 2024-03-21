import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = `http://localhost:8000/supplier`;

export const useGetSupplier = (enabled) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => await axios.get(`${BASE_URL}/list`),
    enabled: enabled
  });

  return { data, isSuccess, isError, isLoading };
};

export const useCreateSupplier = (supplier) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`${BASE_URL}/insert/`, supplier),
    onSuccess: (createdSupplier) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { data } = createdSupplier?.data;
      queryClient.invalidateQueries({
        queryKey: ['suppliers']
      });
      queryClient.setQueryData([`supplier`, { id: data.id }], data);
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useUpdateSupplier = (supplier) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.put(`${BASE_URL}/update/`, supplier),
    onSuccess: (createdSupplier) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { data } = createdSupplier?.data;
      queryClient.invalidateQueries({
        queryKey: ['suppliers']
      });
      queryClient.setQueryData([`supplier`, { id: data.id }], data);
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useDeleteSupplier = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['suppliers']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};
