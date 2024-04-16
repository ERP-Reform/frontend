import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from 'config/axiosConfig';

const useLogin = (user, handleOnSuccess) => {
    return useMutation({
        mutationFn: () => axiosInstance.post(`/account/insert/`, user),
        onSuccess: () => {
            handleOnSuccess();
        },
        onError: (err) => {
            console.error(err);
        }
    });
}

export {
    useLogin
};
