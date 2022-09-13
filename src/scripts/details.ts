import axios, { AxiosRequestConfig } from "axios";
import { BooksResponse } from "../helpers/interfaces";
let API = "http://localhost:1717/books";

export let details = async (id: string, config: AxiosRequestConfig<any>) => {
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
