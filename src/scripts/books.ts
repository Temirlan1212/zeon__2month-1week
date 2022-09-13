import axios, { AxiosRequestConfig } from "axios";
import { BooksResponse, API } from "../helpers/interfaces";
import { details } from "./details";

let card__box = document.querySelector(".hero__main-box") as HTMLDivElement;
let token = localStorage.getItem("token");

let fetchBooks = async () => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "X-Auth": token,
    },
  } as AxiosRequestConfig<any>;

  let { data } = await axios.get<BooksResponse>(`${API}/books`, config);
  card__box.innerHTML = "";
  if (card__box) {
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
  }

  console.log(data);
};

token ? fetchBooks() : "";
