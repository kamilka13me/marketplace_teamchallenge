import React, { FC, useState } from 'react';

import Rating from '../../Rating/ui/Rating';

import { IComment } from '@/enteties/Comment';
import { getUserAuthData, User } from '@/enteties/User';
import DisputeFeedbackModal from '@/features/managingFeedbacks/ui/DisputeFeedbackModal';
import { $api } from '@/shared/api/api';
import plane from '@/shared/assets/icons/plane.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ApiResponse {
  user: User;
}
interface Props {
  comment: IComment;
  alignItems?: 'horizontal' | 'vertical';
  sellerId: string;
}

const Comment: FC<Props> = (props) => {
  const { comment, sellerId, alignItems = 'vertical' } = props;
  const [answerMessage, setAnswerMessage] = useState('');

  const [repliesOpen, setRepliesOpen] = useState(false);

  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);

  const { data, isLoading } = useAxios<ApiResponse>(
    `${ApiRoutes.USER}/${comment?.authorId || ''}`,
  );

  const user = useAppSelector(getUserAuthData);

  const sendMessage = () => {
    const formData = new FormData();

    formData.append('parentId', comment?._id);
    formData.append('sellerId', comment.sellerId);
    formData.append('productId', comment.productId?._id || '');
    formData.append('comment', answerMessage);

    try {
      $api.post(ApiRoutes.SELLER_FEEDBACKS, formData);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const setDisputeModalOpenHandler = () => {
    setIsDisputeModalOpen((prev) => !prev);
  };

  return (
    <div className=" w-full rounded-2xl bg-dark-grey md:p-4">
      <div
        className={`flex flex-col gap-6 ${alignItems === 'vertical' ? 'flex-col md:flex-row' : 'flex-col'} w-full`}
      >
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
                text={`${data?.user?.username[0] || ''}${(data?.user.surname && data?.user?.surname[0]) || ''}`}
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
                text={`${data?.user?.username} ${data?.user?.surname || ''}`}
                size="lg"
                color="white"
              />
            ) : (
              <Text Tag="p" text="" size="lg" color="white" />
            )}
            <Text
              Tag="p"
              text={comment?.productId?.name || ''}
              size="md"
              color="gray"
              className="whitespace-nowrap truncate"
            />
            <Rating rating={comment?.rating?.rating} />
          </div>
        </VStack>
        <div>
          <Text Tag="p" text={comment?.created_at?.slice(0, 10)} size="sm" color="gray" />
          <Text
            Tag="p"
            text={comment?.comment}
            size="md"
            color="gray-light"
            className="mt-1 text-wrap"
          />
        </div>
      </div>

      <VStack gap="2" className="mt-4">
        {comment.images && comment.images.length > 0 ? (
          comment.images.map((img, index) => {
            return (
              <div
                key={index}
                className="!w-[68px] !h-[68px] rounded-lg bg-selected-dark"
              >
                <Image
                  src={`${process.env.BASE_URL}${img}`}
                  alt="img"
                  className="!w-[68px] !h-[68px] !object-cover rounded-lg"
                />
              </div>
            );
          })
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <></>
        )}
      </VStack>
      {comment?.replies?.length > 0 && (
        <VStack justify="end" className="mt-2">
          <Button
            onClick={() => setRepliesOpen((prev) => !prev)}
            variant="border-bottom"
            className="!border-b-grey !text-grey"
          >
            {repliesOpen ? 'Згорнути' : 'Дивитися відповідь'}
          </Button>
        </VStack>
      )}

      {repliesOpen && (
        <div className="ml-10">
          {comment?.replies?.map((repl) => (
            <CommentReply key={repl?._id} comment={repl} />
          ))}
        </div>
      )}

      {comment?.replies?.length === 0 && sellerId === user?._id && (
        <>
          <div className="flex flex-col justify-between gap-4 w-full md:flex-row mt-5">
            <div className="w-full relative">
              <Input
                name="comment"
                type="text"
                variant="clear"
                maxLength={250}
                placeholder="Відповісти на відгук"
                onChange={(e) => setAnswerMessage(e.currentTarget.value)}
                autoComplete="off"
                className=" bg-selected-dark rounded-lg p-4 w-full placeholder:text-disabled focus:outline-none text-white"
              />
              <HStack
                align="center"
                justify="center"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-lg bg-main cursor-pointer"
              >
                <Icon
                  width={18}
                  height={15}
                  Svg={plane}
                  onClick={sendMessage}
                  className="fill-main-dark"
                />
              </HStack>
            </div>
            <Button
              variant="primary"
              className="w-[319px] h-[52px]"
              onClick={setDisputeModalOpenHandler}
            >
              Оскаржити відгук
            </Button>
          </div>
          {isDisputeModalOpen && (
            <DisputeFeedbackModal onCloseFunc={setDisputeModalOpenHandler} />
          )}
        </>
      )}
    </div>
  );
};

interface ReplyProps {
  comment: IComment;
}

const CommentReply: FC<ReplyProps> = (props) => {
  const { comment } = props;

  const { data, isLoading } = useAxios<ApiResponse>(
    `${ApiRoutes.USER}/${comment?.authorId || ''}`,
  );

  return (
    <div className="border-l-2 border-l-main p-2 pb-5 w-full">
      <VStack gap="4" className="w-full">
        <HStack
          justify="center"
          align="center"
          className="!w-[68px] !h-[68px] bg-selected-dark rounded-lg"
        >
          {isLoading ? (
            <Text Tag="span" text="" size="4xl" font="ibm-plex-sans" color="white" />
          ) : (
            <Text
              Tag="span"
              text={`${data?.user?.username[0] || ''} ${(data?.user?.surname && data?.user?.surname[0]) || ''}`}
              size="4xl"
              font="ibm-plex-sans"
              color="white"
            />
          )}
        </HStack>
        <HStack className="w-full">
          <div className="w-full">
            {!isLoading ? (
              <VStack align="center" justify="between">
                <Text
                  Tag="p"
                  text={`${data?.user?.username} ${data?.user?.surname || ''}`}
                  size="lg"
                  color="white"
                />
                <Text
                  Tag="p"
                  text={comment?.created_at?.slice(0, 10) || ''}
                  size="sm"
                  color="white"
                />
              </VStack>
            ) : (
              <Text Tag="p" text="" size="lg" color="white" />
            )}
            <Text
              Tag="p"
              text={comment?.productId?.name || ''}
              size="md"
              color="gray"
              className="whitespace-nowrap truncate"
            />
          </div>
          <Text
            Tag="p"
            text={comment?.comment}
            size="md"
            color="gray-light"
            className="whitespace-nowrap truncate"
          />
        </HStack>
      </VStack>
    </div>
  );
};

export default Comment;
