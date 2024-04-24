import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, err) => {
        if (err?.response?.status === 401 || err?.response?.status === 400) {
          return false; // do not retry, trigger error
        }

        // otherwise, restore default
        const defaultRetry = new QueryClient().getDefaultOptions().queries?.retry;

        return Number.isSafeInteger(defaultRetry) ? failureCount < (defaultRetry ?? 0) : false;
      }
    }
  }
});
