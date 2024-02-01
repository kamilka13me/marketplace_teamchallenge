import { FC, ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData } from '@/enteties/User';
import { UserRoles } from '@/enteties/User/model/types/userRoles';
import { getRouteMain } from '@/shared/const/routes';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

interface Props {
  children: ReactNode;
  roles?: UserRoles[];
}

const RequireAuth: FC<Props> = (props) => {
  const { roles, children } = props;

  const auth = useAppSelector(getUserAuthData);
  const location = useLocation();

  const userHaveRole = (role: UserRoles) => {
    if (!roles) {
      return true;
    }

    return roles.includes(role);
  };

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  if (!userHaveRole(auth.role as UserRoles)) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
