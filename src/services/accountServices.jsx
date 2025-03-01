/* eslint-disable no-unsafe-optional-chaining */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from 'config/axiosConfig';

export const useLogin = (user, handleOnSuccess) => {
  return useMutation({
    mutationFn: () =>
      axiosInstance.post(`/account/login/`, {
        username: user.username,
        pwd: user.password
      }),
    onSuccess: (res) => {
      if (res?.data.length === 0) {
        handleOnSuccess('', '');
      } else {
        const { user, priority } = res?.data?.[0]?.['fields'];
        handleOnSuccess(user, priority);
      }
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useRegistry = (user, handleOnSuccess) => {
  return useMutation({
    mutationFn: () => axiosInstance.post(`/account/registry/`, user),
    onSuccess: () => {
      handleOnSuccess();
    },
    onError: (err) => {
      console.error(err);
    }
  });
};

export const useCreateUser = (user) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.post(`/account/insert/`, { user }),
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

export const useGetUsers = (enabled) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => axiosInstance.get(`/account/list`),
    enabled: enabled
  });

  return { data, isSuccess, isError, isLoading };
};
