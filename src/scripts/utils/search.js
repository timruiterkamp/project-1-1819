import GetData from "../requests/Api";
import Generate from "./generate";

const search = async query => {
  const request = new GetData();
  const create = new Generate();
  const body = document.querySelector(".search-results");
  const filters = document.querySelector(".search-filters");
  const data = await request.searchValue(query);

  create.searchFilters(filters, data);
  create.searchResults(body, data);
};

const onChange = e => {
  console.info(e.target.value);
  const value = e.target.value;
  search(value);
};

export const initSearch = () => {
  const searchField = document.querySelector("#searchField");
  console.log(searchField);
  searchField.addEventListener("input", onChange, false);
};
