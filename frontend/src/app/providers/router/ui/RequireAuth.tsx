import { FC, ReactNode, useEffect } from 'react';

import Cookies from 'js-cookie';
import { Navigate, useLocation } from 'react-router-dom';

import { UserRoles } from '@/enteties/User/model/types/userRoles';
import { getRouteMain } from '@/shared/const/routes';

interface Props {
  children: ReactNode;
  roles?: UserRoles[];
}

const RequireAuth: FC<Props> = (props) => {
  const { roles, children } = props;

  const auth = Cookies.get('user');
  const location = useLocation();

  // @ts-ignore
  const { role } = JSON.parse(auth);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const userHaveRole = (role: UserRoles) => {
    if (!roles) {
      return true;
    }

    return roles.includes(role);
  };

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  if (!userHaveRole(role as UserRoles)) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
