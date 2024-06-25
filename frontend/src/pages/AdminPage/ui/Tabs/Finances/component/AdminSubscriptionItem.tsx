import Cancel from '@/shared/assets/icons/cancel.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

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
  return (
    <div className="max-w-[759px] p-[12px] bg-selected-dark md:p-[24px]">
      <div className="flex justify-end mb-1 md:mb-[18px]">
        <Icon Svg={Cancel} fill="white" onClick={() => setClose(false)} />
      </div>
      <div className="flex justify-between flex-col md:flex-row mb-5">
        <h2 className="text-white text-[20px] mt-[13px] md:mt-0 mb-[12px] font-semibold ml-[25px] md:ml-0 md:mb-[20px] ">
          Змінити тарифний план
        </h2>
        <p className="text-white text-[18px] hidden md:block">
          ID №{sellerId.slice(0, 10).split('-').reverse().join('.')}
        </p>
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
      <div className="flex flex-col-reverse md:flex-row gap-[24px]">
        <Button
          variant="gray"
          onClick={() => setClose(false)}
          className="w-full rounded-lg text-disabled bg-disabled text-[18px] md:w-[312px] px-5 py-[15px]"
        >
          Скасувати
        </Button>

        <Button
          variant="primary"
          onClick={handleConfirm}
          className="w-full rounded-lg text-[18px] md:w-[312px] px-5 py-[15px]"
        >
          Підтвердити
        </Button>
      </div>
    </div>
  );
};

export default AdminSubscriptionItem;
