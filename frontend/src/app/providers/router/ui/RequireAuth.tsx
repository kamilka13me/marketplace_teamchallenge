import { FC, ReactNode } from 'react';

import { UserRoles } from '@/enteties/User/types/userRoles';

interface Props {
  children: ReactNode;
  roles?: UserRoles[];
}

const RequireAuth: FC<Props> = (props) => {
  const { roles, children } = props;

  return (
    <div>
      {children} {roles}
    </div>
  );
};

export default RequireAuth;
