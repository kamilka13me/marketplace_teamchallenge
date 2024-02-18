import { FC } from 'react';

type TextAlign = 'right' | 'left' | 'center';

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';

const TextAlignClass: Record<TextAlign, string> = {
  left: 'text-start',
  center: 'text-center',
  right: 'text-right',
};

const fontSize: Record<HeaderTagType, string> = {
  h1: 'text-5xl',
  h2: 'text-3xl',
  h3: 'text-lg',
  h4: 'text-xm',
  h5: 'text-xs',
  p: 'text-md',
};

interface Props {
  Tag: HeaderTagType;
  text: string;
  bold?: boolean;
  align?: TextAlign;
  className?: string;
}

const Text: FC<Props> = (props) => {
  const { Tag, text, align = 'left', bold, className } = props;

  const textAlign = TextAlignClass[align];
  const textSize = fontSize[Tag];

  return (
    <Tag className={` ${bold ? 'font-bold' : ''} ${textSize} ${textAlign} ${className}`}>
      {text}
    </Tag>
  );
};

export default Text;
