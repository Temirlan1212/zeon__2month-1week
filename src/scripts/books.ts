import axios, { AxiosRequestConfig } from "axios";
import { BooksResponse, API, config, token } from "../helpers/interfaces";
import { details } from "./details";
import { deleteBook } from "./deleteBook";

let card__box = document.querySelector(".hero__main-box") as HTMLDivElement;

let fetchBooks = async () => {
  let { data } = await axios.get<BooksResponse>(`${API}/books`, config);
  card__box.innerHTML = "";
  if (card__box) {
    Promise.all([
      data.map((elem) => {
        let div = document.createElement("div");
        div.innerHTML = `
          <div class="card text-white mb-3 hero__card" style="max-width: 18rem" id="${elem.id}">
            <div class="card-header"><div class="hero__card-header">${elem.author}</div> <div class="hero__card-details"><img id="${elem.id}" class="hero__card-delelte-img" src="https://img.icons8.com/material-outlined/24/e79899/filled-trash.png"/> <img id="${elem.id}" class="hero__card-details-img" src="https://img.icons8.com/external-creatype-glyph-colourcreatype/23/e79899/external-more-interface-a2-creatype-glyph-colourcreatype.png"/> </div></div>
            <div class="card-body">
              <h5 class="card-title hero__card-title" onclick="details('tima')">${elem.name.length == elem.name.slice(0, 22).length ? elem.name : elem.name.slice(0, 20) + " ..."}</h5>
              <p class="card-text">Lorem ipsum Lorem ipsumLorem ipsum</p>
            </div>
            <div class="card-img">
              <img src="${elem.img}"/>
            </div>
          </div>
        `;
        card__box.append(div);
      }),
    ]).then(() => {
      let btn_details = document.querySelectorAll(".hero__card-details-img");
      btn_details.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          let target = e.target as HTMLInputElement;
          details(target.id, config);
        });
      });

      let btn_delete = document.querySelectorAll(".hero__card-delelte-img");
      btn_delete.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          let target = e.target as HTMLInputElement;
          deleteBook(target.id);
          fetchBooks();
        });
      });
    });
  }

  console.log(data);
};

token ? fetchBooks() : "";
