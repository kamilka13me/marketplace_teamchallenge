import { AnchorHTMLAttributes, FC, ReactNode } from 'react';

type TargetType = '_self' | '_blank' | '_parent' | '_top';

type ReferrerType =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string | ReactNode;
  href: string;
  target?: TargetType;
  referrerPolicy?: ReferrerType;
  className?: string;
}

const Link: FC<Props> = (props) => {
  // eslint-disable-next-line no-empty-pattern
  const {
    children,
    href,
    target = '_blank',
    referrerPolicy,
    className,
    ...otherProps
  } = props;

  return (
    <a
      href={href}
      target={target}
      referrerPolicy={referrerPolicy}
      className={className}
      {...otherProps}
    >
      {children}
    </a>
  );
};

export default Link;
