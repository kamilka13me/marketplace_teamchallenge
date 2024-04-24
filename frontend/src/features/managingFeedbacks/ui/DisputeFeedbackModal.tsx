import { FC } from 'react';

import ModalWindow from '../../../shared/ui/ModalWindow/ModalWindow';

import cancel from '@/shared/assets/icons/cancel.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const disputeTypes = [
  {
    id: 0,
    name: 'dispute-type',
    text: 'Відгук залишений несправедливо',
  },
  {
    id: 1,
    name: 'dispute-type',
    text: 'Відгук залишений особою, пов&apos;язаною з продавцем або конкурентом',
  },
  {
    id: 2,
    name: 'dispute-type',
    text: 'Відгук містить небажану комерційну або шахрайську інформацію, або є частиною спам-кампанії',
  },
  {
    id: 3,
    name: 'dispute-type',
    text: 'Відгук стосується роботи служби доставки',
  },
];

interface Props {
  onCloseFunc: () => void;
}

const DisputeFeedbackModal: FC<Props> = (props) => {
  const { onCloseFunc } = props;

  return (
    <ModalWindow
      onCloseFunc={onCloseFunc}
      className="p-6 bg-selected-dark rounded-2xl text-main-white max-w-[725px] w-full"
    >
      <VStack justify="between" className="mb-8">
        <Text Tag="p" text="Оскаржити відгук" size="lg" color="white" />
        <Icon
          Svg={cancel}
          className="fill-main-white cursor-pointer"
          onClick={onCloseFunc}
        />
      </VStack>
      <div className="border-[1px] border-main rounded-lg p-[10px] mb-6">
        <Text
          Tag="p"
          text={
            'Протягом 3х днів ми розглянемо ваш запит та видалимо відгук, якщо скарга є\n' +
            '        обргунтованою'
          }
          size="sm"
          color="white"
        />
      </div>
      <HStack gap="4" className="mb-6">
        {disputeTypes.map((item) => (
          <div key={item.id} className="inline-flex items-center">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="black"
            >
              <input
                name={item.name}
                type="radio"
                className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-main-white text-main-white"
              />
              <span className="absolute text-transparent transition-opacity opacity-0 pointer-events-none top-[22px] left-[22px] -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="#FFFFFF"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8" />
                </svg>
              </span>
            </label>
            {item.text}
          </div>
        ))}
      </HStack>

      <Input
        name="comment"
        type="text"
        placeholder="Залиште додатковий коментар"
        variant="personal"
      />

      <VStack gap="6" className="mt-[38px]">
        <Button
          variant="gray"
          className="w-full bg-disabled rounded-lg h-[52px]"
          onClick={onCloseFunc}
        >
          Скасувати
        </Button>
        <Button variant="primary" className="w-full h-[52px]">
          Надіслати
        </Button>
      </VStack>
    </ModalWindow>
  );
};

export default DisputeFeedbackModal;
