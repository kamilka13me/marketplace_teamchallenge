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

type VariantTypes = 'basic' | 'search' | 'clear' | 'personal' | 'fill';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  basic:
    'outfit h-auto w-auto pl-4 bg-transparent placeholder:text-disabled text-[16px] text-main-dark font-normal border-b-[1px] border-gray-900 focus:text-gray-900 outline-none',
  search:
    'outfit h-auto w-auto pl-5 bg-dark-grey text-light-grey placeholder:text-light-grey text-[14px] font-normal focus:text-light-grey outline-none rounded-l-lg',
  personal:
    'outfit h-auto w-auto pl-4 bg-transparent placeholder:text-white-transparent-70 text-[16px] text-white-transparent-70 font-normal border-b-[1px] border-white-transparent-70 focus:text-white-transparent-70 outline-none',
  fill: 'outfit h-auto w-auto pl-4 bg-selected-dark placeholder:text-disabled text-[14px] text-disabled font-normal border-none rounded-lg focus:text-disabled outline-none',
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
  classNameBlockWrap?: string;
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
    classNameBlockWrap,
    className,
    ...otherProps
  } = props;

  return (
    <HStack gap="1" className={classNameBlockWrap}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        className={`${variantClasses[variant]} ${error && 'border-error-red'} ${className}`}
        {...otherProps}
      />
      {error && <p className="outfit font-normal text-[12px] text-error-red">{error}</p>}
    </HStack>
  );
});

export default Input;
