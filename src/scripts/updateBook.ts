import axios from "axios";
import { API, BooksResponse, config } from "../helpers/interfaces";
import { fetchBooks } from "./books";

let updateB_form = document.querySelector(".updateBook__form") as HTMLFormElement;

let updateB_name = document.querySelector(".updateBook__form-name") as HTMLInputElement;
let updateB_author = document.querySelector(".updateBook__form-author") as HTMLInputElement;
let updateB_year = document.querySelector(".updateBook__form-year") as HTMLInputElement;
let updateB_house = document.querySelector(".updateBook__form-house") as HTMLInputElement;
let updateB_pages = document.querySelector(".updateBook__form-pages") as HTMLInputElement;
let updateB_genres = document.querySelector(".updateBook__form-genres") as HTMLInputElement;
let updateB_language = document.querySelector(".updateBook__form-language") as HTMLInputElement;
let updateB_img = document.querySelector(".updateBook__form-img") as HTMLInputElement;

export let updateBook = async (id: string) => {
  let { data } = await axios.get<BooksResponse>(`${API}/books/${id}`, config);

  updateB_name.value = data.name;
  updateB_author.value = data.author;
  updateB_year.value = data.publishYear.toString();
  updateB_house.value = data.publishHouse;
  updateB_pages.value = data.pagesNumber.toString();
  updateB_genres.value = data.genres.join(", ");
  updateB_img.value = data.img;
  updateB_language.value = data.originalLanguage;

  updateB_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await axios.put<BooksResponse>(`${API}/books/update/${id}`, getValueInp(), config).then((res) => {
      let btn__updateModal_open = document.querySelector(".updateBook-close") as HTMLDivElement;
      btn__updateModal_open.classList.remove("updateBook-open");
      fetchBooks();
    });
  });
};

let getValueInp = () => {
  let user = {
    name: updateB_name.value,
    author: updateB_author.value,
    publishYear: +updateB_year.value,
    publishHouse: updateB_house.value,
    pagesNumber: +updateB_pages.value,
    genres: updateB_genres.value.split(","),
    img: updateB_img.value,
    originalLanguage: updateB_language.value,
  };
  return user;
};
