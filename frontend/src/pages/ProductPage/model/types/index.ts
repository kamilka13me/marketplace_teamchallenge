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
