import { FC } from 'react';

import SafariPage from './ui/SafariPage';

const isSafariBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  return userAgent.includes('safari') && !userAgent.includes('chrome');
};

interface Props {
  children: React.ReactNode;
}

const SafariPlaceholder: FC<Props> = (props) => {
  const { children } = props;

  return isSafariBrowser() ? <SafariPage /> : children;
};

export default SafariPlaceholder;
