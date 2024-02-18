import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: () => void;
  empty?: boolean;
  fill?: boolean;
  outlined?: boolean;
  className?: string;
}

const emptyStyle: string =
  'px-4 py-2 border-none rounded-lg font-normal text-black hover:bg-[#D9C01B] disabled:opacity-30';

const fillStyle: string =
  'bg-[#D9C01B] px-4 py-2 border-2 border-[#D9C01B] rounded-lg font-normal text-black hover:bg-transparent disabled:opacity-30';

const outlinedStyle: string =
  'px-4 py-2 border-2 border-[#D9C01B] rounded-lg font-normal text-black hover:bg-[#D9C01B] disabled:opacity-30';

const Button = memo((props: Props) => {
  const { children, onClick, empty, fill, outlined, className, ...otherProps } = props;

  return (
    <button
      onClick={onClick}
      {...otherProps}
      type="button"
      className={`${empty ? emptyStyle : ''} ${fill ? fillStyle : ''} ${outlined ? outlinedStyle : ''} ${className}`}
    >
      {children}
    </button>
  );
});

export default Button;
