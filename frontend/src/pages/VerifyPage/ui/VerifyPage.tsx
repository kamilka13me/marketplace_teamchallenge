import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { User } from '@/enteties/User';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Container } from '@/shared/layouts/Container';
import useAxios from '@/shared/lib/hooks/useAxios';
import { HStack } from '@/shared/ui/Stack';

interface ApiResponse {
  message: string;
  user: User;
}

const VerifyPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useAxios<ApiResponse>(
    `${ApiRoutes.AUTHENTICATION}/confirm/${id}`,
  );

  if (isLoading) {
    return (
      <Container className="">
        <HStack align="center" justify="center" className="mt-20">
          Verify Loading...
        </HStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="">
        <HStack align="center" justify="center" className="mt-20">
          <div> {error?.message}</div>
        </HStack>
      </Container>
    );
  }

  return (
    <Container className="h-full">
      <HStack align="center" justify="center" className="mt-20">
        <div>{data?.message}</div>
      </HStack>
    </Container>
  );
};

export default VerifyPage;
