import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { Product } from '@/enteties/Product';
import { $api } from '@/shared/api/api';
import attachment from '@/shared/assets/icons/attachmentVert.svg?react';
import star from '@/shared/assets/icons/star-2.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Textarea } from '@/shared/ui/Textarea';

interface Props {
  product: Product;
  stars: number;
  setStars: (i: number) => void;
  refetchFeedbacks?: () => void;
}

const ProductComment: FC<Props> = (props) => {
  const { stars, setStars, product, refetchFeedbacks } = props;

  const [commentMessage, setCommentMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const maxSize = 10 * 1024 * 1024; // 10MB

      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      const invalidTypeFiles = files.filter((file) => !allowedTypes.includes(file.type));
      const invalidSizeFiles = files.filter((file) => file.size > maxSize);

      if (invalidTypeFiles.length > 0) {
        setErrorMessage('Недопустиме розширення файлу!');

        return;
      }

      if (invalidSizeFiles.length > 0) {
        setErrorMessage('Один або кілька файлів розміром більше 10 МБ!');

        return;
      }

      const totalFilesCount = selectedFiles.length + files.length;

      if (totalFilesCount > 2) {
        setErrorMessage('Максимум 2 файлів!');

        return;
      }
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      setErrorMessage('');
    }
  };

  const sendFeedbackHandler = async () => {
    const formData = new FormData();

    formData.append('sellerId', product.sellerId);
    formData.append('productId', product._id);
    formData.append('comment', commentMessage);

    selectedFiles.forEach((file) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      formData.append('images', file);
    });

    try {
      await $api.post(ApiRoutes.SELLER_FEEDBACKS, formData);

      await $api.post(ApiRoutes.FEEDBACK, {
        sellerId: product.sellerId,
        productId: product._id,
        rating: (stars + 1).toString(),
      });
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      setCommentMessage('');
      setStars(0);

      if (refetchFeedbacks) {
        await refetchFeedbacks();
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <HStack gap="4" className="w-full mb-8">
      <VStack gap="2" className="">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Icon
              key={i}
              width={20}
              height={20}
              Svg={star}
              onClick={() => setStars(i)}
              className={`${i <= stars ? '!fill-main' : '!stroke-main'} duration-300 cursor-pointer !stroke-[2px] `}
            />
          ))}
      </VStack>
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Textarea
          name="comment"
          variant="clear"
          placeholder="Напишіть коментар"
          minLength={10}
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.currentTarget.value)}
          className="resize-y !h-[126px] w-full bg-selected-dark border-disabled p-2 !text-disabled focus:outline-none placeholder:text-grey lg:border-[2px] lg:bg-transparent"
        />

        <HStack justify="between" className="lg:flex-row w-full">
          <div className="w-full">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center mt-2">
                <Text Tag="span" text={file.name} size="sm" color="gray" />
                <Button
                  variant="clear"
                  onClick={() => removeFile(index)}
                  className="ml-2 text-red-500"
                >
                  Видалити
                </Button>
              </div>
            ))}
          </div>

          <HStack gap="1" align="start" className=" mt-4 w-full">
            <Text
              Tag="span"
              text="Файли з форматів: png, jpg, jpeg"
              size="sm"
              color="gray-light"
            />
            <VStack gap="4" className="mt-2 w-full lg:justify-end">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="cursor-pointer p-[10px] border-[1px] border-disabled rounded-[4px] lg:min-w-[123px] lg:rounded-none">
                <Text
                  Tag="span"
                  text="Обрати файл"
                  size="md"
                  color="gray-light"
                  className="hidden lg:block"
                />
                <Icon Svg={attachment} className="lg:hidden" />
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <Button
                variant="primary"
                className=" h-[48px] w-full lg:w-[226px]"
                onClick={sendFeedbackHandler}
              >
                Надіслати
              </Button>
            </VStack>
            {errorMessage ? (
              <Text Tag="p" text={errorMessage} size="sm" className="!text-error-red" />
            ) : (
              <Text
                Tag="span"
                text={`${selectedFiles.length > 0 ? `${selectedFiles.length} ${'з 2 файлів обрано'}` : 'файл не обрано'}`}
                size="md"
                className="!text-disabled"
              />
            )}
          </HStack>
        </HStack>
      </form>
    </HStack>
  );
};

export default ProductComment;
