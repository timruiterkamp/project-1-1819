import Store from "../store/index";
import Generate from "./generate";
import { delay } from "./utilities";

const sortOnBooks = e => {
  const create = new Generate();
  const body = document.querySelector(".search-results");

  if (e.target.checked) {
    const bookFiltering = Store.state.searchData.map(data =>
      data.filter(items => items.format === "book")
    );
    create.searchDetailResults(body, bookFiltering);
  } else {
    create.searchDetailResults(body, Store.state.searchData);
  }
};
const sortOnDVD = e => {
  const create = new Generate();
  const body = document.querySelector(".search-results");

  if (e.target.checked) {
    const dvdFiltering = Store.state.searchData.map(data =>
      data.filter(items => items.format === "dvd")
    );
    create.searchDetailResults(body, dvdFiltering);
  } else {
    create.searchDetailResults(body, Store.state.searchData);
  }
};
const sortOnAudio = e => {
  const create = new Generate();
  const body = document.querySelector(".search-results");

  if (e.target.checked) {
    const audioFiltering = Store.state.searchData.map(data =>
      data.filter(items => items.format === "audio")
    );
    create.searchDetailResults(body, audioFiltering);
  } else {
    create.searchDetailResults(body, Store.state.searchData);
  }
};

const sortOnYear = e => {
  const create = new Generate();
  const body = document.querySelector(".search-results");

  const yearFiltering = Store.state.searchData.map(data =>
    data.sort((a, b) => {
      if (
        a.publication &&
        a.publication.year &&
        b.publication &&
        b.publication.year
      ) {
        if (
          a.publication.year.toUpperCase() < b.publication.year.toUpperCase()
        ) {
          return -1;
        }
        if (
          a.publication.year.toUpperCase() > b.publication.year.toUpperCase()
        ) {
          return 1;
        }
        return 0;
      } else {
        return -1;
      }
    })
  );
  create.searchDetailResults(body, yearFiltering);
};

const sortOnTitle = e => {
  const create = new Generate();
  const body = document.querySelector(".search-results");

  const titleFiltering = Store.state.searchData.map(data =>
    data.sort((a, b) => {
      if (a.title && a.title.full && b.title && b.title.full) {
        if (a.title.full.toUpperCase() < b.title.full.toUpperCase()) {
          return -1;
        }
        if (a.title.full.toUpperCase() > b.title.full.toUpperCase()) {
          return 1;
        }
        return 0;
      } else {
        return -1;
      }
    })
  );
  create.searchDetailResults(body, titleFiltering);
};

const sortOnAuthor = e => {
  const create = new Generate();
  const body = document.querySelector(".search-results");

  const authorFiltering = Store.state.searchData.map(data =>
    data.sort((a, b) => {
      if (a.author && b.author) {
        if (a.author.fullname.toUpperCase() < b.author.fullname.toUpperCase()) {
          return -1;
        }
        if (a.author.fullname.toUpperCase() > b.author.fullname.toUpperCase()) {
          return 1;
        }
        return 0;
      } else {
        return -1;
      }
    })
  );
  create.searchDetailResults(body, authorFiltering);
};

const filterTitle = e => {
  delay(() => {
    const create = new Generate();
    const body = document.querySelector(".search-results");
    const titleFiltering = Store.state.searchData.map(data =>
      data.filter(item => {
        if (item.title) {
          return item.title.full
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      })
    );
    create.searchDetailResults(body, titleFiltering);
  }, 400);
};

const filterAuthor = e => {
  delay(() => {
    const create = new Generate();
    const body = document.querySelector(".search-results");
    const authorFiltering = Store.state.searchData.map(data =>
      data.filter(item => {
        if (item.author) {
          return item.author.fullname
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      })
    );
    create.searchDetailResults(body, authorFiltering);
  }, 400);
};

const filterYear = e => {
  delay(() => {
    const create = new Generate();
    const body = document.querySelector(".search-results");
    const yearFiltering = Store.state.searchData.map(data =>
      data.filter(item => {
        if (item.publication && item.publication.year) {
          return item.publication.year
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      })
    );
    create.searchDetailResults(body, yearFiltering);
  }, 400);
};

export const initFilters = () => {
  const books = document.querySelector("#books");
  const dvd = document.querySelector("#dvd");
  const audio = document.querySelector("#audio");
  const year = document.querySelector(".sorting-year");
  const title = document.querySelector(".sorting-title");
  const author = document.querySelector(".sorting-author");
  const stringTitle = document.querySelector("#title");
  const stringAuthor = document.querySelector("#auteur");
  const stringYear = document.querySelector("#year");

  books.addEventListener("change", sortOnBooks);
  dvd.addEventListener("change", sortOnDVD);
  audio.addEventListener("change", sortOnAudio);
  year.addEventListener("click", sortOnYear);
  title.addEventListener("click", sortOnTitle);
  author.addEventListener("click", sortOnAuthor);
  stringTitle.addEventListener("input", filterTitle);
  stringAuthor.addEventListener("input", filterAuthor);
  stringYear.addEventListener("input", filterYear);
};
