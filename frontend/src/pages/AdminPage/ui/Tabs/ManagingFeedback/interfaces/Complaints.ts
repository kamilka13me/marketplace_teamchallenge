export interface ComplaintsResponse {
  totalCount: number;
  complaints: Complaint[];
}

export interface Complaint {
  _id: string;
  reason: number;
  createdAt: string;
  comment: Comment;
  response: Response;
  product: Product;
}

interface Comment {
  _id: string;
  username: string;
  email: string;
  comment: string;
  images: string[];
  rating: number;
}

interface Response {
  _id: string;
  username: string;
  email: string;
  comment: string;
  images: string[];
}

export interface Product {
  _id: string;
  name: string;
  images: string[];
}
