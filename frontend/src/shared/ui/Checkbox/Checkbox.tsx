import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import checked from '@/shared/assets/icons/checked.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'onChange' | 'onBlur' | 'type' | 'value' | 'className'
>;

type VariantTypes = 'basic';

const variantClasses: Record<VariantTypes, string> = {
  basic:
    'peer relative appearance-none cursor-pointer w-[18px] h-[18px] border-[3px] border-gray-300 rounded-[3px] hover:border-gray-900 checked:border-green-100 checked:bg-green-100 checked:hover:border-green-100',
};

interface Props extends HTMLInputProps {
  name: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type: 'checkbox';
  value?: string;
  readonly?: boolean;
  label?: string;
  variant: VariantTypes;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, value, onChange, onBlur, variant, className, ...otherProps } =
    props;

  return (
    <VStack gap="1" align="center" className="relative">
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className={`${variantClasses[variant]} ${className}`}
        {...otherProps}
      />
      <Icon
        Svg={checked}
        width={14}
        height={14}
        className="absolute ml-[2px] hidden peer-checked:block"
      />
      {label && (
        <label htmlFor={name} className="peer-checked:text-gray-300">
          {label}
        </label>
      )}
    </VStack>
  );
});

export default Checkbox;
