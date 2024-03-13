import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = `http://localhost:8000`;

const useGetInvoices = (enabled) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => await axios.get(`${BASE_URL}/list`),
    enabled: enabled
  });

  return { data, isSuccess, isError, isLoading };
};

const useCreateInvoice = (invoice) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`${BASE_URL}`, invoice),
    onSuccess: (createdInvoice) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { data } = createdInvoice?.data;
      queryClient.invalidateQueries({
        queryKey: ['invoices']
      });
      queryClient.setQueryData([`invoice`, { id: data.id }], data);
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

const useDeleteInvoice = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['invoices']
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export { useCreateInvoice, useDeleteInvoice, useGetInvoices };
// eslint-disable-next-line prettier/prettier

