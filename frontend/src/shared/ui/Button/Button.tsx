import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

type VariantTypes =
  | 'clear'
  | 'primary'
  | 'gradient'
  | 'gray'
  | 'light-gray'
  | 'outlined'
  | 'grey-outlined'
  | 'border-bottom';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  primary:
    'bg-main py-2 px-4 text-main-dark rounded-lg hover:bg-secondary-yellow disabled:bg-disabled duration-200',
  gray: 'bg-grey text-white py-2 rounded-lg',
  'light-gray': 'bg-light-grey py-2 rounded-lg',
  gradient: 'bg-gradient-to-r from-[#F8DA2C] to-[#F16644] rounded-lg text-main-white',
  outlined:
    'outfit border-main border-[1px] px-4 py-[7px] rounded-lg font-normal text-[16px] text-main-dark duration-300 hover:border-main-white hover:text-white active:border-secondary active:text-secondary disabled:opacity-40',
  'grey-outlined':
    'bg-transparent rounded-lg border-[1px] border-dark-grey hover:bg-dark-grey duration-100',
  'border-bottom': 'text-main border-b-main border-b-[1px] px-[2px]',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: () => void;
  variant: VariantTypes;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, onClick, variant, className, ...otherProps } = props;

  return (
    <button
      ref={ref}
      onClick={onClick}
      {...otherProps}
      type="button"
      className={`text-center ${variantClasses[variant]} ${className} `}
    >
      {children}
    </button>
  );
});

export default Button;
