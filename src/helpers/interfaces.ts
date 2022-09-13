import { AxiosRequestConfig } from "axios";
export let token = localStorage.getItem("token");

export let API = "http://localhost:1717";

export const config = {
  headers: {
    "X-Auth": token,
  },
} as AxiosRequestConfig<any>;

export interface BooksResponse {
  map(arg0: (elem: any) => void): unknown;
  forEech(arg0: (elem: any) => void): unknown;
  name: string;
  author: string;
  isFavorite: boolean;
  publishYear: number;
  publishHouse: string;
  pagesNumber: number;
  genres: string[];
  originalLanguage: string;
  img: string;
}
