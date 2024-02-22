import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import { HStack } from '@/shared/ui/Stack';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'onChange' | 'onBlur' | 'placeholder' | 'type' | 'value' | 'className'
>;

type InputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

type VariantTypes = 'basic' | 'search';

const variantClasses: Record<VariantTypes, string> = {
  basic: 'mt-1 rounded-md border-gray-200 shadow-sm sm:text-sm',
  search:
    'outfit min-h-[38px] min-w-[443px] pl-5 bg-gray-700 text-gray-300 text-[14px] text-gray-900 font-normal focus:text-gray-300 outline-none rounded-l-lg',
};

interface Props extends HTMLInputProps {
  name: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: InputTypes;
  value?: string;
  readonly?: boolean;
  label?: string;
  error?: string;
  variant: VariantTypes;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    name,
    label,
    error,
    value,
    placeholder,
    onChange,
    onBlur,
    variant,
    className,
    ...otherProps
  } = props;

  return (
    <HStack gap="2">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        className={`${variantClasses[variant]} ${className}`}
        {...otherProps}
      />
      {error && <p>{error}</p>}
    </HStack>
  );
});

export default Input;
