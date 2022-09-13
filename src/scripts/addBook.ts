// let selected = document.querySelector(".choosen-select") as HTMLFormElement;
import { API, BooksResponse, config, token } from "../helpers/interfaces";
import axios, { AxiosRequestConfig } from "axios";

let addB_form = document.querySelector(".addBook__form") as HTMLFormElement;

let addB_name = document.querySelector(".addBook__form-name") as HTMLInputElement;
let addB_author = document.querySelector(".addBook__form-author") as HTMLInputElement;
let addB_year = document.querySelector(".addBook__form-year") as HTMLInputElement;
let addB_house = document.querySelector(".addBook__form-house") as HTMLInputElement;
let addB_pages = document.querySelector(".addBook__form-pages") as HTMLInputElement;
let addB_genres = document.querySelector(".addBook__form-genres") as HTMLInputElement;
let addB_language = document.querySelector(".addBook__form-language") as HTMLInputElement;
let addB_img = document.querySelector(".addBook__form-img") as HTMLInputElement;

let addB_title = document.querySelector(".addBook__title") as HTMLTitleElement;

addB_form?.addEventListener("submit", (e) => {
  e.preventDefault();
  createBook();
  clearInput();

  window.location.href = "index.html";
});

let createBook = async () => {
  console.log(getValueInp());
  let { data } = await axios.post<BooksResponse>(`${API}/books/create`, getValueInp(), config);
  console.log(data);
};

let getValueInp = <BooksResponse>() => {
  let user = {
    name: addB_name.value,
    author: addB_author.value,
    isFavorite: false,
    publishYear: +addB_year.value,
    publishHouse: addB_house.value,
    pagesNumber: +addB_pages.value,
    genres: addB_genres.value.split(","),
    img: addB_img.value,
    originalLanguage: addB_language.value,
  };
  return user;
};

let clearInput = () => {
  addB_name.value = "";
  addB_author.value = "";
  addB_year.value = "";
  addB_house.value = "";
  addB_pages.value = "";
  addB_genres.value = "";
  addB_img.value = "";
  addB_language.value = "";
};

console.log(addB_form);

if (token && addB_form) {
  createBook();
} else {
  addB_form.style.display = "none";
  addB_title.innerText = "Войдите в аккаунт";
}
