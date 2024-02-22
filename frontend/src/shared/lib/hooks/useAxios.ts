import { useEffect, useState } from 'react';

import { $api } from '@/shared/api/api';

interface AxiosResponse<T> {
  data: T;
}

const useAxios = <T>(
  path: string,
): { data: T | null; isLoading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null); // Initialize data with null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await $api.get<T>(`${path}`);

        setData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, isLoading, error };
};

export default useAxios;
