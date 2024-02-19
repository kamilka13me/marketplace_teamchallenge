import { FC } from 'react';

export type TextAlign = 'right' | 'left' | 'center';

export type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';

export type TextColors = 'primary' | 'gray' | 'orange' | 'red' | 'green';

export type TextFonts = 'ibm-plex-sans' | 'outfit';

const TextColor: Record<TextColors, string> = {
  primary: 'text-text',
  gray: 'text-gray',
  orange: 'text-orange',
  red: 'text-red',
  green: 'text-green',
};

const TextAlignClass: Record<TextAlign, string> = {
  left: 'text-start',
  center: 'text-center',
  right: 'text-right',
};

const TextFont: Record<TextFonts, string> = {
  outfit: 'font-outfit',
  'ibm-plex-sans': 'font-ibm-plex-sans',
};

const fontSize: Record<HeaderTagType, string> = {
  h1: 'text-5xl',
  h2: 'text-3xl',
  h3: 'text-lg',
  h4: 'text-xm',
  h5: 'text-xs',
  p: 'text-md leading-[40px]',
  span: 'text-md leading-[40px]',
};

interface Props {
  Tag: HeaderTagType;
  text: string;
  color?: TextColors;
  bold?: boolean;
  font?: TextFonts;
  align?: TextAlign;
  className?: string;
}

const Text: FC<Props> = (props) => {
  const {
    Tag,
    text,
    align = 'left',
    bold,
    className,
    color = 'primary',
    font = 'outfit',
  } = props;

  const textAlign = TextAlignClass[align];
  const textSize = fontSize[Tag];
  const textColor = TextColor[color];
  const textFont = TextFont[font];

  return (
    <Tag
      className={` ${bold ? 'font-bold' : ''}  ${textFont}  ${textSize} ${textAlign} ${textColor} ${className}`}
    >
      {text}
    </Tag>
  );
};

export default Text;
