import { Product } from '@/enteties/Product';
import { IRating } from '@/enteties/Rating';

export interface IComment {
  _id: string;
  authorId: string;
  sellerId: string;
  productId: Product | null;
  rating: IRating;
  parentId: null | IComment;
  replies: IComment[];
  comment: string;
  images: string[];
  created_at: string;
}
