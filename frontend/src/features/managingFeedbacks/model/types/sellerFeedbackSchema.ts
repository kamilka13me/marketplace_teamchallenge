import { EntityState } from '@reduxjs/toolkit';

import { IComment } from '@/enteties/Comment';

export interface SellerFeedbackPageSchema extends EntityState<IComment, string> {
  isLoading?: boolean;
  error?: string;
  totalComments: number;

  // pagination
  offset: number;
  limit: number;
  // filters
  startDate: string | Date;
  endDate: string | Date;
}
