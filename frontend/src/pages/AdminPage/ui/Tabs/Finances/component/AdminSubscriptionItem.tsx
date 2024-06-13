import { useState } from 'react';

import Cancel from '@/shared/assets/icons/cancel.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface AdminSubscriptionItemProps {
  sellerId: string;
  currentPlan: string;
  selectedPlan: string;
  plans: Plan[];
  handleConfirm: () => void;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Plan {
  name: string;
  price: string;
}

const AdminSubscriptionItem = ({
  sellerId,
  currentPlan,
  selectedPlan,
  plans,
  setClose,
  handleConfirm,
}: AdminSubscriptionItemProps) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  return (
    <div className="max-w-[759px] p-[12px] bg-selected-dark md:p-[24px]">
      <div className="flex justify-end mb-[18px]">
        <Icon Svg={Cancel} fill="white" onClick={() => setClose(false)} />
      </div>
      <div className="flex justify-between">
        <h2 className="text-white text-[20px] mt-[13px] md:mt-0 mb-[12px] font-semibold ml-[25px] md:ml-0 md:mb-[20px] ">
          Змінити тарифний план
        </h2>
        <p className="text-white text-[18px]">ID №{sellerId}</p>
      </div>
      <ul className="text-white bg-dark-grey mb-[20px] rounded-2xl md:rounded-none">
        <li className="px-[24px] py-[16px] border-b-[1px] border-secondary-yellow md:px-[32px]">
          <p className="text-[18px] mb-[4px]">Поточний план:</p>
          <h3 className="text-[32px] mb-[4px]">{currentPlan}</h3>
          <p>{`${plans.find((plan) => plan.name === currentPlan)?.price}/місяць`}</p>
        </li>
        <li className="px-[24px] py-[16px] md:px-[32px] ">
          <p className="text-[18px] mb-[4px]">Новий план:</p>
          <h3 className="text-[32px] mb-[4px]">{selectedPlan}</h3>
          <p>{`${plans.find((plan) => plan.name === selectedPlan)?.price}/місяць`}</p>
        </li>
      </ul>
      <p className=" text-white text-sm mb-[27px] pl-[16px] md:pl-[31px] md:text-base">
        Почніть свій новий план{' '}
        {new Date()
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .replace(/\//g, '.')}
        .
      </p>
      <VStack gap="2" className="pl-[16px] mb-[12px] md:pl-[31px] md:mb-[35px]">
        <label htmlFor="all selector" className="relative" aria-label="checkbox">
          <input
            type="checkbox"
            className="peer relative appearance-none cursor-pointer w-[18px] h-[18px] md:h-[24px] md:w-[24px] md: border-[2px] border-light-grey rounded focus:outline-none"
            onChange={() => setIsCheckboxChecked((prevState) => !prevState)}
          />
          <span className="absolute text-main-white transition-opacity opacity-0 left-[2px] top-[2px] pointer-events-none peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[18px] w-[18px] md:h-[24px] md:w-[24px] stroke-[0.1px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
        {window.innerWidth >= 768 ? (
          <Text
            Tag="span"
            text="Ви погоджуєтесь, що ваше членство продовжуватиметься і ми стягуватимемо оновлену щомісячну плату, поки ви не скасуєте послугу. Ви можете скасувати членство в будь-який час, щоб уникнути майбутніх зборів."
            size="md"
            color="white"
            className="-mt-1"
          />
        ) : (
          <Text
            Tag="span"
            text="Ви погоджуєтесь, що ваше членство продовжуватиметься автоматично і
              стягуватиметься щомісячна абонентська плата, до скасування."
            size="sm"
            color="white"
            className="-mt-1"
          />
        )}
      </VStack>
      <div className="flex gap-[24px] px-[31px]">
        <Button
          variant="gray"
          onClick={() => setClose(false)}
          className="w-[99px] text-[16px] rounded-lg hover:underline focus:underline bg-selected-dark text-disabled md:bg-disabled md:text-[18px] md:text-wh md:focus:no-underline md:hover:no-underline md:w-[312px]"
        >
          Скасувати
        </Button>
        {window.innerWidth >= 768 ? (
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="w-[99px] rounded-lg text-[16px] md:text-[18px] md:w-[312px]"
            disabled={!isCheckboxChecked}
          >
            Підтвердити
          </Button>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className={`${
              isCheckboxChecked
                ? 'text-secondary-yellow pointer-events-auto hover:underline focus:underline'
                : 'text-disabled pointer-events-none'
            } py-[8px] w-[99px]`}
          >
            Підтвердити
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminSubscriptionItem;
