import { useState, useEffect } from 'react';

import { Seller } from '../Finances';

import AdminSubscriptionItem from './AdminSubscriptionItem';

import Exclamation from '@/shared/assets/icons/exclamation.svg?react';
import Subs from '@/shared/assets/icons/subs.svg?react';
import Wave from '@/shared/assets/img/wave.png';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';

interface Plan {
  name: string;
  price: string;
  reviews: string;
}

const plans: Plan[] = [
  { name: 'Basic', price: '749 грн', reviews: '10 оголошень' },
  { name: 'Standart', price: '5 499 грн', reviews: '100 оголошень' },
  { name: 'Premium', price: '12 949 грн', reviews: 'Необмежена кількість' },
];

const AdminSubscription = ({
  onPlanSelect,
  seller,
  close,
  setClose,
}: {
  onPlanSelect: (plan: string) => void;
  seller: Seller;
  close: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(seller.subscribe);
  const [activePlan, setActivePlan] = useState<string>(seller.subscribe);

  useEffect(() => {
    setSelectedPlan(seller.subscribe);
  }, [seller.subscribe]);

  const handlePlanSelection = (plan: string): void => {
    setSelectedPlan(plan);
    setClose(true);
  };

  const handleConfirm = (): void => {
    onPlanSelect(selectedPlan);
    setActivePlan(selectedPlan);
    setClose(false);
  };

  return (
    <div>
      <div className="w-full lg:bg-dark-grey lg:rounded-2xl lg:px-[40px] py-[24px] relative z-10 lg:py-5 lg:overflow-hidden">
        <div className="hidden w-[370px] h-[370px] bg-main opacity-40 blur-[100px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-20 lg:block" />
        <div className="flex flex-col md:flex-row justify-between mb-5">
          <h1 className="text-white text-[20px] flex mb-[24px] font-semibold md:mb-[34px]">
            Змінити тарифний план
          </h1>
          <p className="text-white text-[18px]">
            ID №{seller.sellerId._id.slice(0, 10).split('-').reverse().join('.')}
          </p>
        </div>
        <ul className="flex flex-col gap-[40px] mb-[40px] md:flex-row md:flex-wrap lg:flex-nowrap">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`${activePlan === plan.name ? 'bg-gradient-to-r from-[#F35735] to-secondary-yellow p-0.5 rounded-2xl' : ''}`}
            >
              <div className="bg-selected-dark rounded-2xl p-[24px] relative">
                <img
                  src={Wave}
                  alt="Хвиля"
                  className="hidden md:block md:absolute md:left-[0px] md:top-[0px] md:rounded-2xl "
                />
                <p className="text-white text-[24px] relative">{plan.price}</p>
                <h2 className="text-white mb-[44px] text-[32px] relative md:mb-[127px]">
                  {plan.name}
                </h2>
                <div className="flex gap-[10px] mb-[10px]">
                  <Icon
                    Svg={Subs}
                    className="bg-selected-dark stroke-white w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                  />
                  <p className="text-white text-sm flex items-center md:text-base">
                    {plan.reviews}
                  </p>
                </div>
                <div className="flex gap-[10px] mb-[40px] md:mb-[52px]">
                  <Icon
                    Svg={Subs}
                    className="stroke-secondary-yellow w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
                  />
                  <p className="text-white text-sm flex items-center md:text-base">
                    Термін дії місяць
                  </p>
                </div>
                <Button
                  variant={activePlan === plan.name ? 'gray' : 'primary'}
                  className="w-full text-[18px] rounded-lg !text-main-dark md:w-[206px] xl:w-[226px]"
                  onClick={() => handlePlanSelection(plan.name)}
                  disabled={activePlan === plan.name}
                >
                  {activePlan === plan.name ? 'Активний план' : 'Вибрати план'}
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
          <AdminSubscriptionItem
            sellerId={seller.sellerId._id}
            currentPlan={seller.subscribe}
            selectedPlan={selectedPlan}
            plans={plans}
            handleConfirm={handleConfirm}
            setClose={setClose}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default AdminSubscription;
