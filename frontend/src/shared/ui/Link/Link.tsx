import { FC, ReactNode } from 'react';

import { NavLink, NavLinkProps } from 'react-router-dom';

interface LinkProps extends NavLinkProps {
  to: string;
  children: string | ReactNode;
  className?: string;
}

const Link: FC<LinkProps> = (props) => {
  const { to, children, className, ...otherProps } = props;

  return (
    <NavLink to={to} className={className} {...otherProps}>
      {children}
    </NavLink>
  );
};

export default Link;
