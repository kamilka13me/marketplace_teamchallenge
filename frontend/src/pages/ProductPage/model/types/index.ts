import { EntityState } from '@reduxjs/toolkit';

import { IComment } from '@/enteties/Comment';
import { Product } from '@/enteties/Product';

export interface ApiFeedbackResponse {
  comments: IComment[];
  totalComments: number;
}

export interface ApiProductResponse {
  product: Product;
}

export interface NumbersMap {
  [key: string]: number;
}

export type RatingResponse = {
  current: NumbersMap;
  previous: NumbersMap;
};

export interface ProductsCommentsSchema extends EntityState<IComment, string> {
  isLoading?: boolean;
  error?: string;
  offset: number;
  hasMore: boolean;
  limit: number;
  totalComments: number;
}

export interface ProductRatingSchema {
  rating: RatingResponse;
  error?: string;
  isLoading: boolean;
}
