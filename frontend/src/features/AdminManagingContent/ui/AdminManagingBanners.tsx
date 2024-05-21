import { FC, useState } from 'react';

import ModalWindow from '../../../shared/ui/ModalWindow/ModalWindow';

import banner from './photo.png';

import close from '@/shared/assets/icons/cancel.svg?react';
import exclamation from '@/shared/assets/icons/exclamation.svg?react';
import gallery from '@/shared/assets/icons/gallery-add.svg?react';
import trashbin from '@/shared/assets/icons/trash.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const banners = [
  {
    id: 0,
    banner,
  },
  {
    id: 1,
    banner,
  },
  {
    id: 2,
    banner,
  },
  {
    id: 3,
    banner,
  },
  {
    id: 4,
    banner,
  },
];

const AdminManagingBanners: FC = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addBannerModalIsOpen, setAddBannerModalIsOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<number | null>(null);
  const [, setSelectedBannerForDelete] = useState<number | null>(null);

  const closeDeleteBannerModalHandler = () => {
    setDeleteModalIsOpen(false);
    setSelectedBannerForDelete(null);
  };

  const closeAddBannerModalHandler = () => {
    setAddBannerModalIsOpen(false);
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
        <div className="grid grid-cols-5 gap-3">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative cursor-pointer"
              onMouseEnter={() => setCurrentBanner(banner.id)}
              onMouseLeave={() => setCurrentBanner(null)}
            >
              <Image
                objectFit="cover"
                src={banner.banner}
                alt="img"
                className="w-[180px] h-[94px] rounded-lg"
              />
              {currentBanner === banner.id && (
                <ImageDeleteOverlay
                  onClick={() => {
                    setDeleteModalIsOpen(true);
                    setSelectedBannerForDelete(banner.id);
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <VStack justify="between" align="center" className="w-full mt-4">
          <Button onClick={() => setAddBannerModalIsOpen(true)} variant="border-bottom">
            Додати {banners.length > 0 ? 'ще' : ''} баннер
          </Button>

          <Button className="h-12 max-w-[282px] w-full" variant="primary">
            Зберегти
          </Button>
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
                <Button variant="primary" className="!w-full">
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
            <Button variant="primary" className="w-full">
              Додати
            </Button>
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
