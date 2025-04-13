export interface TBlog {
  _id: string;
  author: TAuthor;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
