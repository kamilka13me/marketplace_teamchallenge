import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';

interface UseAxiosData<T> {
  data: T | null;
  error: null | string;
  loading: boolean;
}

export const useAxios = <T>(path: string): UseAxiosData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<T>(`http://localhost:3001/api/status/ping${path}`)
      .then((res: AxiosResponse<T>) => {
        setData(res.data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path]);

  return { data, error, loading };
};
