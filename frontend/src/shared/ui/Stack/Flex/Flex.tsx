import { DetailedHTMLProps, forwardRef, HTMLAttributes, ReactNode } from 'react';

type FlexDirection = 'row' | 'col';
type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type FlexWrap = 'wrap' | 'no-wrap';
type FlexGap = '0' | '1' | '2' | '4' | '5' | '6' | '8' | '10' | '14' | '20';

const directionClasses: Record<FlexDirection, string> = {
  row: 'flex-row',
  col: 'flex-col',
};

const alignClasses: Record<AlignItems, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  stretch: 'items-stretch',
};

const justifyClasses: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  around: 'justify-around',
  between: 'justify-between',
  evenly: 'justify-evenly',
};

const wrapClasses: Record<FlexWrap, string> = {
  wrap: 'flex-wrap',
  'no-wrap': 'flex-nowrap',
};

const gapClasses: Record<FlexGap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '14': 'gap-14',
  '20': 'gap-20',
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  children: ReactNode;
  className?: string;
  direction: FlexDirection;
  align?: AlignItems;
  justify?: JustifyContent;
  wrap?: FlexWrap;
  gap?: FlexGap;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    children,
    className,
    direction,
    align = 'start',
    justify = 'start',
    wrap = 'no-wrap',
    gap = '0',
    ...otherProps
  } = props;

  return (
    <div
      ref={ref}
      className={`flex 
        ${className} 
        ${directionClasses[direction]}
        ${alignClasses[align]}
        ${justifyClasses[justify]}
        ${gapClasses[gap]} 
        ${wrapClasses[wrap]} 
        `}
      {...otherProps}
    >
      {children}
    </div>
  );
});

export default Flex;
