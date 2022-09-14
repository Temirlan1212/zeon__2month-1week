import axios from "axios";
import { API, BooksResponse, config } from "../helpers/interfaces";
import { fetchBooks } from "./books";

export let favUpdate = async (id: string) => {
  console.log(id);
  let { data } = await axios.get<BooksResponse>(`${API}/books/${id}`, config);
  console.log(data.isFavorite, "one Product");

  await axios.put<BooksResponse>(
    `${API}/books/update/${id}`,
    {
      isFavorite: data.isFavorite ? false : true,
    },
    config
  );
  fetchBooks();
};
