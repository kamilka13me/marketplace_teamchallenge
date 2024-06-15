import { FC } from 'react';

import { SellerStatus } from '@/enteties/Seller/model/types/seller';
import info from '@/shared/assets/icons/info-circle.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {
  status: SellerStatus;
}

// Dictionary for status translations
const statusTranslations: Record<SellerStatus, string> = {
  active: 'Активний',
  blocked: 'Заблоковано',
  work: 'На розгляді',
  close: 'Відхилено',
};

const SellerStatusBadge: FC<Props> = (props) => {
  const { status } = props;
  const translatedStatus = statusTranslations[status] || status;

  return (
    <div
      className={`
      w-[128px] h-[26px] flex justify-center items-center gap-2 rounded-lg
      ${status === 'active' && 'bg-main'} 
      ${status === 'blocked' && 'bg-[#393939]'} 
      ${status === 'work' && 'bg-main-white'}
      ${status === 'close' && 'bg-light-grey'}
      `}
    >
      <Text
        Tag="span"
        text={translatedStatus}
        size="sm"
        className={`${status === 'blocked' && '!text-main-white'}`}
      />
      {(status === 'blocked' || status === 'close') && (
        <Icon
          width={16}
          height={16}
          Svg={info}
          className={`${status === 'close' ? 'stroke-selected-dark' : 'stroke-main-white'}`}
        />
      )}
    </div>
  );
};

export default SellerStatusBadge;
