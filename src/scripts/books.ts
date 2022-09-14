import axios, { AxiosRequestConfig } from "axios";
import { BooksResponse, API, config, token } from "../helpers/interfaces";
import { details } from "./details";
import { deleteBook } from "./deleteBook";
import { updateBook } from "./updateBook";

let card__box = document.querySelector(".hero__main-box") as HTMLDivElement;

export let fetchBooks = async () => {
  let { data } = await axios.get<BooksResponse>(`${API}/books`, config);
  card__box.innerHTML = "";
  if (card__box) {
    Promise.all([
      data.map((elem) => {
        let div = document.createElement("div");
        div.innerHTML = `
          <div class="card text-white mb-3 hero__card" style="max-width: 18rem" id="${elem.id}">
            <div class="card-header"><div class="hero__card-header">${elem.author}</div> <div class="hero__card-details"> <img class="hero__card-fav-img"  src="https://img.icons8.com/metro/20/${elem.isFavorite ? "e79899" : "dfdee5"}/hearts.png"/> <img id="${elem.id}" class="hero__card-update-img" src="https://img.icons8.com/material-sharp/17/e79899/edit--v1.png"/> <img id="${
          elem.id
        }" class="hero__card-details-img" src="https://img.icons8.com/external-creatype-glyph-colourcreatype/17/e79899/external-more-interface-a2-creatype-glyph-colourcreatype.png"/> </div></div>
            <div class="card-body">
              <h5 class="card-title hero__card-title">${elem.name.length == elem.name.slice(0, 22).length ? elem.name : elem.name.slice(0, 20) + " ..."}</h5>
              <p class="card-text">Lorem ipsum Lorem ipsumLorem ipsum</p>
            </div>
            <div class="card-img">
              <img src="${elem.img}"/>
            </div>
          </div>
        `;
        card__box.append(div);
      }),
      // <img id="${elem.id}" class="hero__card-delete-img" src="https://img.icons8.com/material-outlined/17/e79899/filled-trash.png"/>
    ]).then(() => {
      let btn_details = document.querySelectorAll(".hero__card-details-img");
      btn_details.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          let target = e.target as HTMLInputElement;
          details(target.id, config);
        });
      });

      let btn_delete = document.querySelectorAll(".hero__card-delete-img");
      btn_delete.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          let target = e.target as HTMLInputElement;
          deleteBook(target.id);
          fetchBooks();
        });
      });

      let btn_update = document.querySelectorAll(".hero__card-update-img");
      btn_update.forEach((elem) => {
        elem.addEventListener("click", async (e) => {
          let target = e.target as HTMLInputElement;
          let btn__updateModal_open = document.querySelector(".updateBook-close") as HTMLDivElement;
          btn__updateModal_open.classList.add("updateBook-open");

          let btn__updateModal_close = document.querySelector(".updateBook__close-icon") as HTMLDivElement;
          btn__updateModal_close.addEventListener("click", () => {
            btn__updateModal_open.classList.remove("updateBook-open");
          });

          updateBook(target.id);
        });
      });

      let btn_fav = document.querySelectorAll(".hero__card-fav-img");
      btn_fav.forEach((elem) => {
        elem.addEventListener("click", () => {});
      });
    });
  }

  console.log(data);
};

token ? fetchBooks() : "";
