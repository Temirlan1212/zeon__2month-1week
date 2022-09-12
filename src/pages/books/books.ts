import axios, { AxiosRequestConfig } from "axios";
import { createElement } from "react";
let API = "http://localhost:1717/books";

let card__box = document.querySelector(".hero__main-box") as HTMLDivElement;
let token = localStorage.getItem("token");

interface BooksResponse {
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
}

let fetchBooks = async () => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "X-Auth": token,
    },
  } as AxiosRequestConfig<any>;

  let { data } = await axios.get<BooksResponse>(`${API}`, config);

  card__box.innerHTML = "";

  Promise.all([
    data.map((elem) => {
      let div = document.createElement("div");
      div.innerHTML = `
    <div class="card text-white mb-3 hero__card" style="max-width: 18rem" id="${elem.id}">
      <div class="card-header"><div class="hero__card-header">${elem.author}</div></div>
      <div class="card-body">
        <h5 class="card-title hero__card-title">${elem.name}</h5>
        <p class="card-text">Lorem ipsum Lorem ipsumLorem ipsum</p>
      </div>
    </div>
    `;

      card__box.append(div);
    }),
  ]);

  console.log(data);
};

token ? fetchBooks() : "";
