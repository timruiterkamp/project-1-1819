import Store from "../store/index";
import Generate from "./generate";
import { delay } from "./utilities";

const sortOnBooks = e => {
  const create = new Generate();
  const body = document.querySelector(".search-results");

  if (e.target.checked) {
    const bookFiltering = Store.state.searchData.map(data =>
      data.filter(items => items.formats.format._text === "book")
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
      data.filter(items => items.formats.format._text === "dvd")
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
      data.filter(items => items.formats.format._text === "audio")
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
          a.publication.year._text.toUpperCase() <
          b.publication.year._text.toUpperCase()
        ) {
          return -1;
        }
        if (
          a.publication.year._text.toUpperCase() >
          b.publication.year._text.toUpperCase()
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
      if (
        a.titles &&
        a.titles.title._text &&
        b.titles &&
        b.titles.title._text
      ) {
        if (
          a.titles.title._text.toUpperCase() <
          b.titles.title._text.toUpperCase()
        ) {
          return -1;
        }
        if (
          a.titles.title._text.toUpperCase() >
          b.titles.title._text.toUpperCase()
        ) {
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
      if (a.authors && a.authors.author && b.authors && b.authors.author) {
        if (
          a.authors["main-author"]._text.toUpperCase() <
          b.authors["main-author"]._text.toUpperCase()
        ) {
          return -1;
        }
        if (
          a.authors["main-author"]._text.toUpperCase() >
          b.authors["main-author"]._text.toUpperCase()
        ) {
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
        if (item.titles && item.titles.title._text) {
          return item.titles.title._text
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
        if (item.authors && item.authors["main-author"]._text) {
          return item.authors["main-author"]._text
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
        if (item.publication && item.publication.year._text) {
          return item.publication.year._text
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
  const stringISBN = document.querySelector("#isbn");
  const stringUitgever = document.querySelector("#uitgever");
  const stringGenre = document.querySelector("#Genre");

  books.addEventListener("change", sortOnBooks);
  dvd.addEventListener("change", sortOnDVD);
  audio.addEventListener("change", sortOnAudio);
  year.addEventListener("click", sortOnYear);
  title.addEventListener("click", sortOnTitle);
  author.addEventListener("click", sortOnAuthor);
  stringTitle.addEventListener("input", filterTitle);
  stringAuthor.addEventListener("input", filterAuthor);
  stringYear.addEventListener("input", filterYear);
  stringISBN.addEventListener("input", filterISBN);
  stringUitgever.addEventListener("input", filterUitgever);
  stringGenre.addEventListener("change", filterGenre);
};
