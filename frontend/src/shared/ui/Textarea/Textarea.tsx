import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from 'react';

import { HStack } from '@/shared/ui/Stack';

type HTMLTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name' | 'onChange' | 'onBlur' | 'placeholder' | 'value' | 'className'
>;

type VariantTypes = 'clear' | 'personal' | 'fill';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  personal:
    'outfit h-auto w-auto bg-transparent placeholder:text-white-transparent-70 text-[16px] text-white-transparent-70 font-normal border-[1px] border-white-transparent-70 focus:text-white-transparent-70 outline-none',
  fill: 'min-h-[80px] w-full bg-selected-dark resize-none',
};

interface Props extends HTMLTextareaProps {
  name: string;
  onBlur?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
  readonly?: boolean;
  label?: string;
  error?: string;
  variant: VariantTypes;
  classNameBlockWrap?: string;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
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
      <textarea
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

export default Textarea;
