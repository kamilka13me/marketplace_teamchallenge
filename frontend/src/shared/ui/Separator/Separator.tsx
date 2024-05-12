import { FC } from 'react';

interface Props {
  className?: string;
}

const Separator: FC<Props> = (props) => {
  const { className } = props;

  return (
    <div
      className={`w-full h-[1px] bg-light-grey rounded-lg md:w-[1px] md:h-[128px] md:bg-selected-dark ${className}`}
    />
  );
};

export default Separator;
