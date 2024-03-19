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

type VariantTypes = 'basic' | 'search' | 'clear' | 'personal';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  basic:
    'outfit min-h-[48px] min-w-[360px] pl-4 bg-transparent placeholder:white-400 text-[16px] text-gray-900 font-normal border-b-[1px] border-gray-900 focus:text-gray-900 outline-none',
  search:
    'outfit min-h-[38px] min-w-[295px] lg:min-w-[443px] pl-5 bg-gray-700 text-gray-300 placeholder:white-400 text-[14px] font-normal focus:text-gray-300 outline-none rounded-l-lg',
  personal:
    'outfit min-h-[48px] min-w-[318px] pl-4 bg-transparent placeholder:white-transparent-70 text-[16px] text-white-transparent-70 font-normal border-b-[1px] border-white-transparent-70 focus:text-white-transparent-70 outline-none',
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
    <HStack gap="1">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        className={`${variantClasses[variant]} ${error && 'border-red-200'} ${className}`}
        {...otherProps}
      />
      {error && <p className="outfit font-normal text-[12px] text-red-200">{error}</p>}
    </HStack>
  );
});

export default Input;
