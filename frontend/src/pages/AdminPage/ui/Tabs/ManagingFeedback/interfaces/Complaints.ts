export interface ComplaintsResponse {
  totalCount: number;
  complaints: Complaint[];
}

export interface Complaint {
  _id: string;
  commentId: CommentId;
  reason: number;
  created_at: string;
  __v: number;
  comment: Comment;
  response: Response;
  product: Product;
}

interface CommentId {
  _id: string;
  authorId: AuthorId;
  sellerId: string;
  productId: ProductId;
  parentId: string;
  comment: string;
  images: string[];
  created_at: string;
  __v: number;
}

interface AuthorId {
  _id: string;
}

interface ProductId {
  _id: string;
  name: string;
  price: number;
}

interface Comment {
  _id: string;
  authorId: AuthorId2;
  sellerId: string;
  productId: string;
  parentId: string;
  comment: string;
  images: string[];
  created_at: string;
  __v: number;
}

interface AuthorId2 {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isAccountConfirm: boolean;
  isAccountActive: boolean;
  views: string[];
  wishlist: string[];
  created_at: string;
  __v: number;
  opened: string[];
}

interface Response {
  _id: string;
  authorId: AuthorId3;
  sellerId: string;
  productId: string;
  parentId: string;
  comment: string;
  images: string[];
  created_at: string;
  __v: number;
}

interface AuthorId3 {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isAccountConfirm: boolean;
  isAccountActive: boolean;
  views: string[];
  wishlist: string[];
  created_at: string;
  __v: number;
  opened: string[];
}

interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  discount: number;
  category: string;
  quantity: number;
  views: number;
  images: string[];
  discount_start: string;
  discount_end: string;
  sellerId: string;
  isActive: boolean;
  condition: string;
  status: string;
  specifications: Specification[];
  created_at: string;
  __v: number;
  opened: number;
  averageRating: number;
}

interface Specification {
  specification: string;
  specificationDescription: string;
}
