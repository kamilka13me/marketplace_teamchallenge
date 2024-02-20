import { ButtonHTMLAttributes, FC } from 'react';

import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Icon } from '@/shared/ui/Icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrevArrow: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      className="absolute left-4 top-1/2 -translate-y-1/2 h-[48px] w-[48px]
      rounded-full z-50 flex justify-center items-center
      bg-gradient-to-r from-slider-btn-from to-slider-btn-to
      hover:bg-secondary transition-all duration-300"
      onClick={onClick}
    >
      <Icon Svg={arrowRight} width={32} height={32} className="rotate-180" />
    </button>
  );
};

export default PrevArrow;
