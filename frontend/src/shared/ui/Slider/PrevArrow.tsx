import { ButtonHTMLAttributes, FC } from 'react';

import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Icon } from '@/shared/ui/Icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrevArrow: FC<Props> = (props) => {
  const { onClick, className } = props;

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-[48px] w-[48px]
      rounded-full z-[5] justify-center items-center
      bg-gradient-to-r from-gray-100 to-gray-600
      hover:from-secondary hover:to-gray-600
      ${className?.includes('slick-disabled') && 'cursor-default !hover:from-gray-200 !from-gray-200'}
      `}
      onClick={onClick}
    >
      <Icon Svg={arrowRight} width={32} height={32} className="rotate-180" />
    </button>
  );
};

export default PrevArrow;
