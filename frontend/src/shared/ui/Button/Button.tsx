import { memo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Button = memo((props: Props) => {
  const { children } = props;

  return <button type="button">{children}</button>;
});

export default Button;
