import { FC } from 'react';

export type TextAlign = 'right' | 'left' | 'center';

export type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TextColors =
  | 'primary'
  | 'gray'
  | 'gray-light'
  | 'orange'
  | 'red'
  | 'green'
  | 'white'
  | 'dark';

export type FontSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type TextFonts = 'ibm-plex-sans' | 'outfit';

const TextColor: Record<TextColors, string> = {
  primary: 'text-main-dark',
  gray: 'text-grey',
  'gray-light': 'text-disabled',
  orange: 'text-orange',
  red: 'text-error-red',
  green: 'text-green',
  white: 'text-main-white',
  dark: 'text-main-dark',
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

const fontSize: Record<FontSize, string> = {
  xxs: 'text-xxs',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl font-semibold',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl font-semibold',
  '4xl': 'text-4xl font-ibm-plex-sans',
};

interface Props {
  Tag: HeaderTagType;
  text: string|undefined;
  size: FontSize;
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
    size,
    align = 'left',
    bold,
    className,
    color = 'primary',
    font = 'outfit',
  } = props;

  const textAlign = TextAlignClass[align];
  const textSize = fontSize[size];
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
