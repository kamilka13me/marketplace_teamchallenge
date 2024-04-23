import { Product } from '@/enteties/Product';
import { IRating } from '@/enteties/Rating';

export interface IComment {
  _id: string;
  authorId: string;
  sellerId: string;
  productId: Product;
  ratingId: IRating;
  parentId: null | IComment;
  comment: string;
  images: string[];
  created_at: string;
}
