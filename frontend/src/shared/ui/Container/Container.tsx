import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = (props) => {
  const { children } = props;

  return <div className="max-w-[1440px] px-16">{children}</div>;
};

export default Container;
