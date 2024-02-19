import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

type VariantTypes = 'empty' | 'fill' | 'outlined';

const variantClasses: Record<VariantTypes, string> = {
  empty:
    'px-4 py-2 border-none rounded-lg font-normal text-black hover:bg-[#D9C01B] disabled:opacity-30',
  fill: 'bg-[#D9C01B] px-4 py-2 border-2 border-[#D9C01B] rounded-lg font-normal text-black hover:bg-transparent disabled:opacity-30',
  outlined:
    'px-4 py-2 border-2 border-[#D9C01B] rounded-lg font-normal text-black hover:bg-[#D9C01B] disabled:opacity-30',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: () => void;
  variant: VariantTypes;
  className?: string;
}

const Button = memo((props: Props) => {
  const { children, onClick, variant, className, ...otherProps } = props;

  return (
    <button
      onClick={onClick}
      {...otherProps}
      type="button"
      className={`${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
});

export default Button;
