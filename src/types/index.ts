import { Img } from "../components/Img/types";

export type DynamicObject<T> = {
  [key: string]: T;
};

export interface Post {
  id: string;
  content: string;
  poster: Img;
  thumbnail: Img;
  title: string;
  subtitle: string;
}
