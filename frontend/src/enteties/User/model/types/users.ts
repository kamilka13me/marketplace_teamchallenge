import { EntityState } from '@reduxjs/toolkit';

import { User } from '@/enteties/User';

export interface UsersSchema extends EntityState<User, string> {
  isLoading?: boolean;
  error?: string;
  totalUsers: number;

  // pagination
  offset: number;
  limit: number;
  // filters
  sortBy: string;
  sortDirection: '1' | '-1';

  _inited: boolean;
}
