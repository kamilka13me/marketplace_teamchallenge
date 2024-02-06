import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';

interface UseAxiosData<T> {
  data: T | null;
  error: null | string;
  loading: boolean;
}

export const useAxios = <T>(route: string): UseAxiosData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<T>(`https://jsonplaceholder.typicode.com/${route}`)
      .then((res: AxiosResponse<T>) => {
        setData(res.data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, error, loading };
};
