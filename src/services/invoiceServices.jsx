import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from 'config/axiosConfig';

const useGetInvoices = (enabled) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => axiosInstance.get(`/invoice/list`),
    enabled: enabled
  });

  return { data, isSuccess, isError, isLoading };
};

const useCreateInvoice = (invoice, handleOnSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.post(`/invoice/insert/`, invoice),
    onSuccess: (createdInvoice) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { data } = createdInvoice?.data;
      queryClient.invalidateQueries({
        queryKey: ['invoices']
      });
      queryClient.setQueryData([`invoice`, { id: data.id }], data);
      handleOnSuccess();
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

const useDeleteInvoice = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.delete(`/invoice/${id}`),
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

const useBatchDeleteInvoices = (ids, handleOnDeleteSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axiosInstance({
        method: 'delete',
        url: `/invoice/delete`,
        data: { ids }
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['invoices']
      });
      handleOnDeleteSuccess(response);
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export { useBatchDeleteInvoices, useCreateInvoice, useDeleteInvoice, useGetInvoices };
// eslint-disable-next-line prettier/prettier
