import { memo } from 'react';

interface Props {
  children: string;
}

const Button = memo((props: Props) => {
  const { children } = props;

  return (
    <button type="button" className="">
      {children}
    </button>
  );
});

export default Button;
