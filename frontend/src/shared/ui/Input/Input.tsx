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
        className={`border-2 border-gray-500 ${className}`}
        {...otherProps}
      />
      {error && <p>{error}</p>}
    </HStack>
  );
});

export default Input;
