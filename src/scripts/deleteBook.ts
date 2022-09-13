import axios from "axios";
import { API, config, BooksResponse } from "../helpers/interfaces";

export let deleteBook = async (id: string) => {
  console.log(id);
  await axios.delete<BooksResponse>(`${API}/books/delete/${id}`, config);
};
