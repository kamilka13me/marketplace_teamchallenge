import { FC } from 'react';

import Rating from '../../Rating/ui/Rating';

import { IComment } from '@/enteties/Comment';
import { User } from '@/enteties/User';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ApiResponse {
  user: User;
}
interface Props {
  comment: IComment;
}

const Comment: FC<Props> = (props) => {
  const { comment } = props;

  const { data, isLoading } = useAxios<ApiResponse>(
    `${ApiRoutes.USER}/${comment.authorId}`,
  );

  return (
    <div className="bg-dark-grey">
      <VStack gap="6">
        <VStack gap="4">
          <HStack
            justify="center"
            align="center"
            className="w-[68px] h-[68px] bg-selected-dark rounded-lg"
          >
            {isLoading ? (
              <Text Tag="span" text="" size="4xl" font="ibm-plex-sans" color="white" />
            ) : (
              <Text
                Tag="span"
                text={`${data?.user?.username[0]}`}
                size="4xl"
                font="ibm-plex-sans"
                color="white"
              />
            )}
          </HStack>
          <div className="overflow-hidden w-[170px]">
            {!isLoading ? (
              <Text
                Tag="p"
                text={`${data?.user?.username} ${!!data?.user?.surname || ''}`}
                size="lg"
                color="white"
              />
            ) : (
              <Text Tag="p" text="" size="lg" color="white" />
            )}
            <Text
              Tag="p"
              text={comment?.productId?.name}
              size="md"
              color="gray"
              className="whitespace-nowrap truncate"
            />
            <Rating rating={comment?.ratingId?.rating} />
          </div>
        </VStack>
        <div>
          <Text Tag="p" text={comment?.created_at.slice(0, 10)} size="sm" color="gray" />
          <Text
            Tag="p"
            text={comment?.comment}
            size="md"
            color="white"
            className="mt-1"
          />
        </div>
      </VStack>
    </div>
  );
};

export default Comment;
