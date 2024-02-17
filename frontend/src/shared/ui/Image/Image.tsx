import { FC, ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: 'cover' | 'contain';
  className?: string;
}

const Image: FC<Props> = (props) => {
  const {
    src,
    alt,
    height,
    width,
    objectFit = 'cover',
    className,
    ...otherProps
  } = props;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
      {...otherProps}
    />
  );
};

export default Image;
