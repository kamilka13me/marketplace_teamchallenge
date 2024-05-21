import React, { ChangeEvent, FC, useState } from 'react';

import ModalWindow from '../../../shared/ui/ModalWindow/ModalWindow';

import { $api } from '@/shared/api/api';
import close from '@/shared/assets/icons/cancel.svg?react';
import exclamation from '@/shared/assets/icons/exclamation.svg?react';
import gallery from '@/shared/assets/icons/gallery-add.svg?react';
import trashbin from '@/shared/assets/icons/trash.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ImageData {
  _id: string;
  image: string;
}

const AdminManagingBanners: FC = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addBannerModalIsOpen, setAddBannerModalIsOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<string | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [selectedBannerForDelete, setSelectedBannerForDelete] = useState<string | null>(
    null,
  );
  const [bannerErrorMessage, setBannerErrorMessage] = useState('');
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerPreviewOverlayIsOpen, setBannerPreviewOverlayIsOpen] = useState(false);

  const {
    data: banners,
    isLoading,
    refetch,
  } = useAxios<ImageData[]>(ApiRoutes.CONTROL_PANEL);

  const closeDeleteBannerModalHandler = () => {
    setDeleteModalIsOpen(false);
    setSelectedBannerForDelete(null);
  };

  const closeAddBannerModalHandler = () => {
    setAddBannerModalIsOpen(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

      if (file) {
        if (!allowedTypes.includes(file.type)) {
          setBannerErrorMessage('Недопустиме розширення файлу!');

          return;
        }

        if (file.size > maxSize) {
          setBannerErrorMessage('Файл розміром більше 10 МБ!');

          return;
        }

        setBanner(file);
        setBannerPreview(URL.createObjectURL(file));
        setBannerErrorMessage('');
        closeAddBannerModalHandler();
      }
    } else {
      setBannerErrorMessage('Щось пышло не так');
    }
  };

  const deleteBannerHandler = async () => {
    try {
      await $api.delete(`${ApiRoutes.CONTROL_PANEL}/${selectedBannerForDelete}`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      setDeleteModalIsOpen(false);
      refetch();
    }
  };

  const sendBanner = async () => {
    if (!banner) {
      setBannerErrorMessage('Будь ласка, виберіть баннер для завантаження.');

      return;
    }

    const formData = new FormData();

    formData.append('image', banner);

    try {
      await $api.post(ApiRoutes.CONTROL_PANEL, formData);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      setBanner(null);
      setBannerPreview(null);
      setBannerErrorMessage('');
      refetch();
    }
  };

  return (
    <section className="px-4 py-6 rounded-lg bg-dark-grey w-full">
      <HStack className="gap-3">
        <Text Tag="h3" text="Управління контентом" size="xl" color="white" />
        <Text
          Tag="h4"
          text="Для  редагування, наведіть мишкою на банер."
          size="lg"
          color="gray-light"
        />
        {isLoading ? (
          <div className="grid grid-cols-5 gap-3">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} width={180} height={94} border="16px" />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            {banners?.map((banner) => (
              <div
                key={banner._id}
                className="relative"
                onMouseEnter={() => setCurrentBanner(banner._id)}
                onMouseLeave={() => setCurrentBanner(null)}
              >
                <Image
                  objectFit="cover"
                  src={`${process.env.BASE_URL}${banner.image}`}
                  alt="img"
                  className="w-[180px] h-[94px] rounded-lg"
                />
                {currentBanner === banner._id && (
                  <ImageDeleteOverlay
                    onClick={() => {
                      setDeleteModalIsOpen(true);
                      setSelectedBannerForDelete(banner._id);
                    }}
                  />
                )}
              </div>
            ))}
            {bannerPreview && (
              <div
                onMouseEnter={() => setBannerPreviewOverlayIsOpen(true)}
                onMouseLeave={() => setBannerPreviewOverlayIsOpen(false)}
                className="relative"
              >
                <Image
                  objectFit="cover"
                  src={bannerPreview}
                  alt="Preview"
                  className="w-[180px] h-[94px] rounded-lg"
                />
                {bannerPreviewOverlayIsOpen && (
                  <ImageDeleteOverlay
                    onClick={() => {
                      setBannerPreview(null);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}

        <VStack justify="between" align="center" className="w-full mt-4">
          {!bannerPreview ? (
            <Button onClick={() => setAddBannerModalIsOpen(true)} variant="border-bottom">
              Додати {(banners?.length || 0) > 0 ? 'ще' : ''} баннер
            </Button>
          ) : (
            <div />
          )}

          {bannerPreview && (
            <Button
              onClick={sendBanner}
              className="h-12 max-w-[282px] w-full justify-self-end"
              variant="primary"
            >
              Зберегти
            </Button>
          )}
        </VStack>
      </HStack>

      {deleteModalIsOpen && (
        <ModalWindow
          className="flex flex-col items-center !bg-selected-dark rounded-2xl max-w-[404px] !pb-[60px] w-full drop-shadow-custom-dark-modal"
          onCloseFunc={closeDeleteBannerModalHandler}
        >
          <Icon
            Svg={close}
            width={24}
            height={24}
            className="fill-main-white self-end cursor-pointer"
            onClick={closeDeleteBannerModalHandler}
          />
          <HStack className="max-w-[284px] w-full">
            <Icon
              width={36}
              height={36}
              Svg={exclamation}
              className="fill-error-red self-center mt-5"
            />
            <Text
              Tag="h5"
              text="Ви впевнені?"
              size="xl"
              color="white"
              className="self-center mt-3 "
            />
            <HStack gap="5" className="mt-8 px-2">
              <Text
                Tag="h5"
                text="Ви дійсно хочете видалити фото? Цю дію неможливо буде відмінити."
                align="center"
                size="md"
                color="gray-light"
              />
              <VStack gap="4" justify="between" className="w-full">
                <Button
                  variant="light-gray"
                  className="!w-full"
                  onClick={closeDeleteBannerModalHandler}
                >
                  Відмінити
                </Button>
                <Button
                  onClick={deleteBannerHandler}
                  variant="primary"
                  className="!w-full"
                >
                  Видалити
                </Button>
              </VStack>
            </HStack>
          </HStack>
        </ModalWindow>
      )}

      {addBannerModalIsOpen && (
        <ModalWindow
          className="flex flex-col items-center !bg-selected-dark rounded-2xl max-w-[386px] w-full"
          onCloseFunc={closeAddBannerModalHandler}
        >
          <Icon
            Svg={close}
            width={24}
            height={24}
            className="fill-main-white self-end cursor-pointer"
            onClick={closeAddBannerModalHandler}
          />
          <Icon Svg={gallery} width={48} height={48} />
          <div className="max-w-[227px] w-full mt-[10px]">
            <Text
              Tag="h5"
              align="center"
              text="Завантажте фотографію розміром до 10 Мегабайт"
              size="md"
              color="gray-light"
            />
          </div>
          <HStack gap="2" align="center" className="w-full max-w-[282px] mt-7">
            <Text Tag="p" text={bannerErrorMessage} size="md" color="red" />

            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="flex justify-center items-center cursor-pointer rounded-lg h-[48px] bg-main w-full">
              <Text Tag="span" text="Додати" size="md" align="center" />
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <Button
              onClick={closeAddBannerModalHandler}
              className="text-sm"
              variant="border-bottom"
            >
              Відмінити
            </Button>
          </HStack>
        </ModalWindow>
      )}
    </section>
  );
};

export default AdminManagingBanners;

interface ImageDeleteOverlayProps {
  onClick: () => void;
}

const ImageDeleteOverlay: FC<ImageDeleteOverlayProps> = (props) => {
  const { onClick } = props;

  return (
    <HStack
      justify="center"
      align="center"
      className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 rounded-lg"
    >
      <Button variant="clear" onClick={onClick}>
        <HStack justify="center" align="center" className="w-11 h-11 rounded-lg bg-main">
          <Icon width={24} height={24} Svg={trashbin} className="!stroke-selected-dark" />
        </HStack>
      </Button>
    </HStack>
  );
};
