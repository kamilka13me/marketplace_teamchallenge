import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  SVGProps,
  VFC,
} from 'react';

import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'onChange' | 'onBlur' | 'type' | 'value' | 'className'
>;

interface Props extends HTMLInputProps {
  name: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type: 'checkbox';
  value?: string;
  readonly?: boolean;
  label?: string;
  classNameWrapper?: string;
  className?: string;
  classNameLabel?: string;
  classNameIcon?: string;
  icon: VFC<SVGProps<SVGSVGElement>> | string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    name,
    label,
    value,
    onChange,
    onBlur,
    classNameWrapper,
    className,
    classNameLabel,
    classNameIcon,
    icon,
    ...otherProps
  } = props;

  return (
    <VStack gap="1" align="center">
      <label
        htmlFor={name}
        className={`outfit font-normal cursor-pointer duration-300 ${classNameLabel}`}
      >
        <VStack gap="1" align="center" className={`relative ${classNameWrapper}`}>
          <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            className={`peer relative appearance-none cursor-pointer w-6 h-6 border-[1px] ${className}`}
            {...otherProps}
          />
          <Icon
            Svg={icon}
            width={14}
            height={14}
            className={`absolute hidden peer-checked:block cursor-pointer ${classNameIcon}`}
          />
          {label && label}
        </VStack>
      </label>
    </VStack>
  );
});

export default Checkbox;
