import { FC } from 'react';

import { t } from 'i18next';

import { adminOffersActions } from '@/features/managingOffers';
import { getAdminOffersSortDirection } from '@/features/managingOffers/model/selectors';
import checked from '@/shared/assets/icons/checked-gold.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Checkbox } from '@/shared/ui/Checkbox';

const SpecyfyingSorting: FC = () => {
  const dispatch = useAppDispatch();

  const sortDirection = useAppSelector(getAdminOffersSortDirection);

  const isAscending = () => {
    if (sortDirection === '1') {
      return true;
    }

    return false;
  };
  const onCheckClick = () => {
    if (isAscending()) {
      dispatch(adminOffersActions.setSortDirection('-1'));
    } else {
      dispatch(adminOffersActions.setSortDirection('1'));
    }
  };

  return (
    <div className="absolute top-10 left-0 w-[274px] h-[84px] bg-selected-dark hover:drop-shadow-custom-primary rounded-[8px] flex items-center justify-evenly flex-col z-50">
      <div className="w-[100%] h-[28px] p-[2px_12px] flex items-center justify-center gap-[8px]">
        <Checkbox
          name="sort"
          type="checkbox"
          classNameLabel="text-disabled text-[14px] has-[:checked]:text-selected-yellow hover:text-light-grey"
          className="w-[24px] h-[24px] border-[1px] border-light-grey rounded-[3px] hover:border-main checked:border-main focus:outline-none hover:cursor-pointer text-sm"
          classNameIcon="ml-[2px] w-[20px]"
          icon={checked}
          label={t('За датою: від старих до нових')}
          onChange={onCheckClick}
          checked={isAscending()}
        />
      </div>
      <div className="w-[100%] h-[28px] p-[2px_12px] flex items-center justify-center gap-[8px]">
        <Checkbox
          name="sort1"
          type="checkbox"
          classNameLabel="text-disabled text-[14px] has-[:checked]:text-selected-yellow hover:text-light-grey"
          className="w-[24px] h-[24px] border-[1px] border-light-grey rounded-[3px] hover:border-main checked:border-main  checked:hover:border-main focus:outline-none hover:cursor-pointer text-sm"
          classNameIcon="ml-[2px] w-[20px]"
          icon={checked}
          label={t('За датою: від нових до старих')}
          onChange={onCheckClick}
          checked={!isAscending()}
        />
      </div>
    </div>
  );
};

export default SpecyfyingSorting;
