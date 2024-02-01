import React, { FC } from 'react';

// eslint-disable-next-line no-undef
import IntrinsicElements = React.JSX.IntrinsicElements;

type TextTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';

const TextType: Record<TextTagType, string> = {
  h1: 'text-5xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-bold',
  h4: 'text-lg font-bold',
  p: 'text-md',
  small: 'text-sm',
};

interface Props {
  className?: string;
  tag: TextTagType;
  text: string;
}

const Text: FC<Props> = (props) => {
  const { tag, text, className } = props;

  const TagElement = tag as keyof IntrinsicElements;

  return <TagElement className={`${className} ${TextType[tag]} `}>{text}</TagElement>;
};

export default Text;
