import Component from "../lib/component";
import eventHandler from "./eventHandler";
import { cleanString } from "./clean";

export default class Generate extends Component {
  constructor() {
    super();
    this.w = this.dom.write;
  }

  async searchFilters(appendParent, data) {
    appendParent.innerHTML = "";
    const w = this.w;

    if (!data.titles) {
      appendParent.appendChild(
        this.dom.create(
          w(
            "p",
            { class: "no-results" },
            "Geen resultaten, probeer een andere zoekterm"
          )
        )
      );
    } else {
      const content = w(
        "div",
        { class: "search-items" },
        ...data.titles.map(result =>
          w(
            "div",
            { class: "search-item" },
            w("h4", {}, result.title),
            result.author_main
              ? w(
                  "p",
                  { class: "author" },
                  `Auteur: ${cleanString(result.author_main)}`
                )
              : "",
            w("p", { class: "type" }, `soort: ${result.formats[0]}`)
          )
        )
      );
      appendParent.appendChild(this.dom.create(content));
    }
  }

  async searchResults(appendParent, data) {
    appendParent.innerHTML = "";
    const w = this.w;

    console.log(data);
    if (!data.titles) {
      appendParent.appendChild(
        this.dom.create(
          w(
            "p",
            { class: "no-results" },
            "Geen resultaten, probeer een andere zoekterm"
          )
        )
      );
    } else {
      const content = w(
        "div",
        { class: "search-items" },
        ...data.titles.map(result =>
          w(
            "div",
            { class: "search-item" },
            w("h4", {}, result.title),
            result.author_main
              ? w(
                  "p",
                  { class: "author" },
                  `Auteur: ${cleanString(result.author_main)}`
                )
              : "",
            w("p", { class: "type" }, `soort: ${result.formats[0]}`)
          )
        )
      );
      appendParent.appendChild(this.dom.create(content));
    }
  }
}
