import attachment from '@/shared/assets/icons/attachment.svg?react';
import caretDown from '@/shared/assets/icons/caret-down.svg?react';
import image from '@/shared/assets/icons/image.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';

export interface Props {
  stats: 'views' | 'clicks';
}

const QuantityStats = ({ stats }: Props) => {
  return (
    <div className=" py-5 px-6 rounded-2xl bg-dark-grey text-main-white">
      <HStack className="w-[200px] gap-[14px]">
        <div className="bg-main p-[7px] rounded-md">
          <Icon Svg={stats === 'views' ? image : attachment} width={16} height={16} />
        </div>
        <div>
          <p className="flex items-center gap-2 font-semibold text-2xl leading-[30px]  text-center">
            500
            <span className="flex gap-1 text-[#24a148] text-sm font-normal text-start">
              <Icon Svg={caretDown} width={16} height={16} />
              2.8%
            </span>
          </p>
          <p>Кількість {stats === 'views' ? 'переглядів' : 'кліків'}</p>
        </div>
        <p className="text-disabled text-xs">
          Січень: <span className="text-main-white">143</span>
        </p>
      </HStack>
    </div>
  );
};

export default QuantityStats;
