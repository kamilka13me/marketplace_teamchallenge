import React, { ChangeEvent, FC, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { setSupportSeller } from '@/enteties/Seller/model/services/setSupportSeller';
import cancel from '@/shared/assets/icons/cancel.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Textarea } from '@/shared/ui/Textarea';

interface FieldsSupportValues {
  inputTopic: string;
  textareaQuestion: string;
  inputFile: File[];
}

const SupportCentre: FC = () => {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FieldsSupportValues>({
    mode: 'all',
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const maxSize = 10 * 1024 * 1024; // 10MB

      const allowedTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const invalidTypeFiles = files.filter((file) => !allowedTypes.includes(file.type));
      const invalidSizeFiles = files.filter((file) => file.size > maxSize);

      if (invalidTypeFiles.length > 0) {
        setErrorMessage(t('Недопустиме розширення файлу!'));

        return;
      }

      if (invalidSizeFiles.length > 0) {
        setErrorMessage(t('Один або кілька файлів розміром більше 10 МБ!'));

        return;
      }

      const totalFilesCount = selectedFiles.length + files.length;

      if (totalFilesCount > 5) {
        setErrorMessage(t('Максимум 5 файлів!'));

        return;
      }
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      setErrorMessage('');
    }
  };

  const onSubmitSupport: SubmitHandler<FieldsSupportValues> = async (data) => {
    const formData = new FormData();

    formData.append('topic', data.inputTopic);
    formData.append('content', data.textareaQuestion);

    selectedFiles.forEach((file) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      formData.append('images', file);
    });

    await dispatch(setSupportSeller(formData)).then((value) => {
      if (value.meta.requestStatus !== 'rejected') {
        reset({
          inputTopic: '',
          textareaQuestion: '',
          inputFile: [],
        });
        setShowModal(!showModal);
        setSelectedFiles([]);
        setErrorMessage('');
      }
    });
  };

  return (
    <div className="w-full lg:bg-dark-grey lg:rounded-2xl lg:px-[52px] py-[24px] lg:py-5 lg:overflow-hidden relative z-10">
      <div className="hidden lg:block w-[370px] h-[370px] bg-main opacity-40 blur-[100px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-20" />
      <VStack className="flex-col lg:flex-row lg:gap-[48px] px-0">
        <form
          onSubmit={handleSubmit(onSubmitSupport)}
          className="w-full mb-12 lg:mb-0 lg:p-10 lg:bg-selected-dark lg:rounded-2xl lg:min-w-[440px]"
        >
          <Text
            Tag="p"
            text={t('Напишіть нам')}
            size="xl"
            color="white"
            className="mb-5"
          />
          <Input
            variant="personal"
            className="min-h-[48px] w-full"
            classNameBlockWrap="mb-6"
            autoComplete="off"
            placeholder={t('Вкажіть тему звернення')}
            type="text"
            {...register('inputTopic', {
              required: t("Це поле є обов'язковим"),
              maxLength: {
                value: 100,
                message: t('Ваша тема має містити не більше 100 символів'),
              },
            })}
            error={errors?.inputTopic && errors?.inputTopic.message}
          />
          <Textarea
            variant="personal"
            className="resize-none px-4 py-2 w-full min-h-[216px]"
            classNameBlockWrap="mb-2"
            autoComplete="off"
            placeholder={t('Опишіть суть питання')}
            {...register('textareaQuestion', {
              required: t("Це поле є обов'язковим"),
              maxLength: {
                value: 500,
                message: t('Ваше питання має містити не більше 500 символів'),
              },
            })}
            error={errors?.textareaQuestion && errors?.textareaQuestion.message}
          />
          <Text
            Tag="p"
            text={`${t('Файли форматів: ')} png, jpg, pdf, doc, docx`}
            size="sm"
            className="!text-disabled mb-2"
          />

          <VStack align="center" gap="6" className="mb-6">
            <label
              htmlFor="inputFile"
              className="min-w-[123px] cursor-pointer font-normal text-center text-[16px] leading-[21px] text-white-transparent-70 p-[10px] border-[1px] border-white-transparent-70"
            >
              {t('Обрати файл')}
            </label>
            <input
              id="inputFile"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              multiple
              className="hidden"
              {...register('inputFile', {
                onChange: (e) => {
                  handleFileChange(e);
                },
              })}
            />
            {errorMessage ? (
              <Text Tag="p" text={errorMessage} size="sm" className="!text-error-red" />
            ) : (
              <Text
                Tag="span"
                text={`${selectedFiles.length > 0 ? `${selectedFiles.length} ${t('з 5 файлів обрано')}` : t('файл не обрано')}`}
                size="md"
                className="!text-disabled"
              />
            )}
          </VStack>

          <button
            className="outfit bg-main w-full py-[15px] rounded-lg font-normal leading-[22px] text-[16px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:opacity-40"
            type="submit"
            disabled={!isValid}
          >
            {t('Надіслати')}
          </button>
        </form>

        <div className="w-full lg:p-10 lg:bg-selected-dark lg:rounded-2xl">
          <Text Tag="p" text={t('Контакти')} size="xl" color="white" className="mb-8" />
          <Text
            Tag="p"
            text={t(
              'Звʼяжіться з нами і ми протягом 24 годин  надамо відповідь на Ваш запит.',
            )}
            size="md"
            className="!text-disabled text-wrap mb-5 lg:mb-9"
          />
          <Text
            Tag="p"
            text={`${t('тел: ')} +38 044 234 234 234`}
            size="md"
            className="!text-disabled"
          />
          <Text
            Tag="p"
            text="e-mail: office@peach.ua"
            size="md"
            className="!text-disabled mb-5 lg:mb-9"
          />
          <Text
            Tag="p"
            text={`${t('ТОВ')} “Peach”`}
            size="md"
            className="!text-disabled"
          />
          <Text
            Tag="p"
            text={t('вул. Хрещатик, 15 офіс 24 м. Київ, 01001')}
            size="md"
            className="!text-disabled text-wrap"
          />
        </div>
      </VStack>

      {showModal && (
        <ModalWindow
          onCloseFunc={() => {
            setShowModal(!showModal);
          }}
          className="max-w-[440px] bg-selected-dark pt-2 pb-5 px-5 md:px-4 md:py-4 rounded-2xl animate-open-forms-modal"
        >
          <VStack align="center" justify="end">
            <Icon
              clickable
              onClick={() => {
                setShowModal(!showModal);
              }}
              Svg={cancel}
              width={24}
              height={24}
              className="fill-main-white hover:transition hover:rotate-90 hover:duration-300 duration-300"
            />
          </VStack>
          <HStack align="center" className="max-w-[320px] mt-3 md:m-5 gap-3 md:gap-10">
            <Text
              Tag="p"
              text={t('Дякуємо за звернення!')}
              size="xl"
              align="center"
              className="text-main-white text-nowrap !text-md md:!text-xl"
            />
            <Text
              Tag="p"
              text={t(
                'Очікуйте на відповідь на Ваш e-mail найближчим часом. Ми намагаємось відповісти вам якомога швидше.',
              )}
              size="md"
              align="center"
              className="text-main-white !text-sm md:!text-md"
            />
          </HStack>
        </ModalWindow>
      )}
    </div>
  );
};

export default SupportCentre;
