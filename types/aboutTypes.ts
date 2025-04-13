import { TAuthor } from "./blogsTypes";

export interface TAbout {
  _id: string;
  me: TAuthor;
  title: string;
  description: string;
  image: string;
  country: string;
  address: string;
  district: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
