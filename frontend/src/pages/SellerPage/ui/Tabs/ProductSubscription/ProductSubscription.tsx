import { useState } from 'react';

import Cancel from '@/shared/assets/icons/cancel.svg?react';
import Exclamation from '@/shared/assets/icons/exclamation.svg?react';
import Subs from '@/shared/assets/icons/subs.svg?react';
import Wave from '@/shared/assets/img/wave.png';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const plans = [
  { name: 'Basic', price: '749 грн' },
  { name: 'STANDART', price: '5 499 грн' },
  { name: 'PREMIUM', price: '12 949 грн' },
];

const ProductSubscription = () => {
  const [close, setClose] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Basic');
  const [activePlan, setActivePlan] = useState<string>('Basic');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  const currentDate = new Date()
    .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .replace(/\//g, '.');

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    setIsCheckboxChecked(false);
    setClose(true);
  };

  const handleConfirm = () => {
    setActivePlan(selectedPlan);
    setClose(false);
  };

  return (
    <div>
      <div className="w-full lg:bg-dark-grey lg:rounded-2xl lg:px-[40px] py-[24px] lg:py-5 lg:overflow-hidden relative z-10 ">
        <div className="hidden lg:block w-[370px] h-[370px] bg-main opacity-40 blur-[100px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-20" />
        <h1 className="text-white text-[24px] flex justify-center mb-[34px] font-semibold">
          Виберіть тарифний план підписки, який підходить саме вам
        </h1>
        <ul className="flex gap-[40px] mb-[40px]">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`${activePlan === plan.name ? 'bg-gradient-to-r from-[#F35735] to-secondary-yellow p-0.5 rounded-2xl' : ''}`}
            >
              <div
                className={`w-[274px] h-[406px] bg-selected-dark rounded-2xl p-[24px] relative `}
              >
                <img
                  src={Wave}
                  alt="Хвиля"
                  className="absolute left-[0px] top-[0px] rounded-2xl"
                />
                <p className="text-white text-[24px] relative">{plan.price}</p>
                <h2 className="text-white mb-[127px] text-[32px] relative">
                  {plan.name}
                </h2>
                <div className="flex gap-[10px] mb-[10px]">
                  <Icon Svg={Subs} className="bg-selected-dark stroke-white" />
                  <p className="text-white ">100 оголошень</p>
                </div>
                <div className="flex gap-[10px] mb-[52px]">
                  <Icon Svg={Subs} className="stroke-secondary-yellow" />
                  <p className="text-white">Термін дії місяць</p>
                </div>
                <Button
                  variant={activePlan === plan.name ? 'gray' : 'primary'}
                  className="w-[226px] text-[18px] rounded-lg !text-main-dark"
                  onClick={() => handlePlanSelection(plan.name)}
                  disabled={activePlan === plan.name}
                >
                  {activePlan === plan.name ? 'Активний план' : 'Вибрити план'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex gap-[8px] items-center">
          <Icon Svg={Exclamation} className="fill-secondary-yellow" />
          <p className="text-white text-sm">Ви можете обрати тільки один тарифний план</p>
        </div>
      </div>
      {close && (
        <ModalWindow
          onCloseFunc={() => setClose(false)}
          className="bg-selected-dark rounded-2xl animate-open-forms-modal"
        >
          <div className="w-[759px] p-[24px] bg-selected-dark">
            <div className="flex justify-between">
              <h2 className="text-white text-[20px] mb-[20px] font-semibold">
                Змінити тарифний план
              </h2>
              <Icon Svg={Cancel} fill="white" onClick={() => setClose(false)} />
            </div>
            <ul className="text-white bg-dark-grey mb-[20px]">
              <li className="px-[32px] py-[16px] border-b-[2px] border-secondary-yellow">
                <p className="text-[18px] mb-[4px]">Поточний план:</p>
                <h3 className="text-[32px] mb-[4px]">{activePlan}</h3>
                <p>{`${plans.find((plan) => plan.name === selectedPlan)?.price}/місяць`}</p>
              </li>
              <li className="px-[32px] py-[16px]">
                <p className="text-[18px] mb-[4px]">Новий план:</p>
                <h3 className="text-[32px] mb-[4px]">{selectedPlan}</h3>
                <p>{`${plans.find((plan) => plan.name === selectedPlan)?.price}/місяць`}</p>
              </li>
            </ul>
            <p className="text-white mb-[27px] px-[31px]">
              Почніть свій новий план {currentDate}.
            </p>
            <VStack gap="2" className="px-[31px] mb-[35px]">
              <label htmlFor="all selector" className="relative" aria-label="checkbox">
                <input
                  type="checkbox"
                  className="peer relative appearance-none cursor-pointer w-6 h-6 border-[2px] border-light-grey rounded focus:outline-none"
                  onChange={() => setIsCheckboxChecked((prevState) => !prevState)}
                />
                <span className="absolute text-main-white transition-opacity opacity-0 left-[2px] top-[2px] pointer-events-none peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-[0.1px]"
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
              <Text
                Tag="span"
                text="Ви погоджуєтесь, що ваше членство продовжуватиметься і ми стягуватимемо оновлену щомісячну плату, поки ви не скасуєте послугу. Ви можете скасувати членство в будь-який час, щоб уникнути майбутніх зборів."
                size="md"
                color="white"
                className="-mt-1"
              />
            </VStack>
            <div className="flex gap-[24px] px-[31px]">
              <Button
                variant="gray"
                onClick={() => setClose(false)}
                className="w-[312px] text-[18px] rounded-lg"
              >
                Скасувати
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirm}
                className="w-[312px] text-[18px] rounded-lg"
                disabled={!isCheckboxChecked}
              >
                Підтвердити
              </Button>
            </div>
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default ProductSubscription;
