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
          <div class="card-header"><div class="hero__card-header">${elem.author}</div> <div class="hero__card-details"><img id="${elem.id}" class="hero__card-details-img" src="https://img.icons8.com/external-creatype-glyph-colourcreatype/23/e79899/external-more-interface-a2-creatype-glyph-colourcreatype.png"/></div></div>
          <div class="card-body">
            <h5 class="card-title hero__card-title" onclick="details('tima')">${elem.name}</h5>
            <p class="card-text">Lorem ipsum Lorem ipsumLorem ipsum</p>
          </div>
        </div>
      `;
      card__box.append(div);
    }),
  ]).then(() => {
    let btn = document.querySelectorAll(".hero__card-details-img");
    btn.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        let target = e.target as HTMLInputElement;
        details(target.id, config);
      });
    });
  });
  console.log(data);
};

token ? fetchBooks() : "";

let details = async (id: string, config: AxiosRequestConfig<any>) => {
  let { data } = await axios.get<BooksResponse>(`${API}/${id}`, config);
  console.log(data);

  let modal = document.querySelector(".details__main-box") as HTMLDivElement;
  modal.style.transform = "scale(1)";
  modal.innerHTML = "";
  // let div= document.createElement("div")

  modal.innerHTML = `<div class="modal-section">
  <span class="details__modal-exit"> &#10005;</span>
  <h2>${data.name}</h2>
  <div class="details__modal-texts">
    <span>Автор : &nbsp; </span>
    <p>${data.author}</p>
  </div>
  <div class="details__modal-country">
    <span>Родной язык : &nbsp; </span>
    <p>${data.originalLanguage}</p>
  </div>
  <div class="details__modal-genres">
    <span>Жанры : &nbsp; </span>
    ${data.genres.map((elem: string) => `<p>${elem}</p>`)}
  </div>
  <div class="details__modal-lists">
    <span>Страницы :&nbsp; </span>
    <p>&nbsp;${data.pagesNumber} стр</p>
  </div>
  <div class="details__modal-year">
    <span>год выпуска : &nbsp; </span>
    <p>&nbsp;${data.publishYear}</p>
  </div>
</div>`;

  let close_btn = document.querySelector(".details__modal-exit ") as HTMLDivElement;
  close_btn.addEventListener("click", () => {
    modal.style.transform = "scale(0)";
  });
};
