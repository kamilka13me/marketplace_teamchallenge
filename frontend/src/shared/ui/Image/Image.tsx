import {
  FC,
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  loadingFallback?: ReactElement;
  objectFit?: 'cover' | 'contain';
  className?: string;
}

const AppImage: FC<Props> = (props) => {
  const {
    src,
    alt,
    height,
    width,
    loadingFallback,
    objectFit = 'cover',
    className,
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();

    img.src = src || '';
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading) {
    return loadingFallback;
  }

  if (hasError) {
    return <div>err</div>;
  }

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

export default memo(AppImage);
