import { FC, SVGProps, VFC } from 'react';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface Props extends SvgProps {
  Svg: VFC<SVGProps<SVGSVGElement>>;
  className?: string;
}

interface NonClickableIconProps extends Props {
  clickable?: false;
}

interface ClickableBaseProps extends Props {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

const Icon: FC<IconProps> = (props) => {
  // eslint-disable-next-line no-empty-pattern
  const { Svg, width = 24, height = 24, clickable, className, ...otherProps } = props;

  const icon = (
    <Svg width={width} height={height} className={`${className}`} {...otherProps} />
  );

  if (clickable) {
    return (
      <button
        type="button"
        className=""
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }

  return icon;
};

export default Icon;
