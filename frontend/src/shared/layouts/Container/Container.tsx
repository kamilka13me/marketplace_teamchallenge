import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Container: FC<Props> = (props) => {
  const { children, className } = props;

  return <div className={`max-w-[1440px] px-16 mx-auto ${className}`}>{children}</div>;
};

export default Container;
