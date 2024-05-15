import { useEffect, useState } from 'react';

import { $api } from '@/shared/api/api';

interface AxiosResponse<T> {
  data: T;
}

const useAxios = <T>(
  path: string,
): { data: T | null; isLoading: boolean; error: Error | null; refetch: () => void } => {
  const [data, setData] = useState<T | null>(null); // Initialize data with null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<T> = await $api.get<T>(`${path}`);

      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useAxios;
