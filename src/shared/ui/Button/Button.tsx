import { memo } from 'react';

interface Props {
  children: string;
  onClick?: () => void;
}

const Button = memo((props: Props) => {
  const { children, onClick } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-red-500 px-3 py-1 rounded-md font-bold text-white"
    >
      {children}
    </button>
  );
});

export default Button;
