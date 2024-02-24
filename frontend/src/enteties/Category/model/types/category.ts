export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
  parentId: string | null;
  subcategories: Category;
}
