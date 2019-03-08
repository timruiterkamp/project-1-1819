import GetData from "../requests/Api";
import Generate from "./generate";
import eventHandler from "./eventHandler";
import { delay } from "./utilities";
import Store from "../store/index";
import { initFilters } from "./filter";

const onClick = () => {
  const value = document.querySelector("#searchField").value;
  document.querySelector(".autocomplete-results").classList.add("hidden");
  searchDetail(value);
};

const search = async (query, amount) => {
  const request = new GetData();
  const create = new Generate();
  const body = document.querySelector(".autocomplete-results");
  const event = new eventHandler();

  event.loading(body);
  const data = await request.searchAutoCompleteValue(query, amount);
  body.classList.remove("hidden");
  create.searchResults(body, data);
  const items = document.querySelectorAll(".autocomplete-item");
  items.forEach(item => item.classList.add("fade-in"));
  const moreResults = document.querySelector(".autocomplete-more");
  if (moreResults) {
    moreResults.addEventListener("click", onClick);
  }
};

const searchDetail = async query => {
  const request = new GetData();
  const create = new Generate();
  const event = new eventHandler();
  const body = document.querySelector(".search-results");
  const aside = document.querySelector(".filters-wrapper");
  const sorting = document.querySelector(".sorting");
  body.innerHTML = "";
  body.classList.add("loading");
  event.loading(body);
  body.classList.remove("fade-in-top-fast");

  const data = await request.searchValue(query);

  Store.dispatch("setSearchData", data);
  aside.classList.remove("hidden");
  body.classList.remove("loading");
  sorting.classList.remove("hidden");
  sorting.classList.add("fade-in-top-slow");
  body.classList.add("fade-in-top-fast");
  aside.classList.add("fade-in-top");
  create.searchDetailResults(body, Store.state.searchData);
  initFilters();
};

const initSearchMode = () => {
  document.querySelector(".subcontent").style = "opacity: 0;";
  document.querySelector(".title").classList.add("searching");
  document.querySelector(".form-wrapper").classList.add("searching");
};

const onSubmit = e => {
  e.preventDefault();
  // initSearchMode();
  // const value = document.querySelector("#searchField").value;
  // searchDetail(value);
};

const onChange = e => {
  e.preventDefault();
  const autoCompleteField = document.querySelector(".autocomplete-results");
  const background = document.querySelector(".background-circle");
  autoCompleteField.innerHTML = "";
  background.classList.add("effect");
  initSearchMode();

  delay(() => {
    autoCompleteField.classList.remove("hidden");
    autoCompleteField.classList.add("searching");
    search(e.target.value, 3);
  }, 400);
};

export const initSearch = () => {
  const searchForm = document.querySelector(".search-form");
  const searchField = document.querySelector("#searchField");
  searchForm.addEventListener("submit", onSubmit);
  searchField.addEventListener("input", onChange);
};
