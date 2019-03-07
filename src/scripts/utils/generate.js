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
  }

  async searchResults(appendParent, data) {
    appendParent.innerHTML = "";
    const w = this.w;

    data.map(res => {
      if (!res) {
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
          { class: "autocomplete-items" },
          ...res.map(result => {
            return result && result.titles.title._text
              ? w(
                  "a",
                  {
                    class: "autocomplete-item",
                    href: result["detail-page"]._text,
                    target: "_blank"
                  },

                  w(
                    "div",
                    { class: "autocomplete-image" },
                    result.coverimages
                      ? w("img", {
                          src: result.coverimages.coverimage[0]._text
                        })
                      : w("div", { class: "autocomplete-image-placeholder" })
                  ),
                  w(
                    "div",
                    { class: "autocomplete-text" },
                    result.titles && result.titles.title._text
                      ? w("h4", {}, result.titles.title._text)
                      : w("h4", {}, "Titel: niet bekend"),

                    result.authors
                      ? w(
                          "p",
                          {},
                          "format: " + result.authors["main-author"]._text
                        )
                      : w("p", {}, "Auteur: niet bekend"),
                    result.summaries
                      ? w("p", {}, result.summaries.summary._text)
                      : w("p", {}, "Samenvatting: niet bekend"),
                    result.formats
                      ? w("p", {}, "format: " + result.formats.format._text)
                      : w("p", {}, "Format: niet bekend")
                  )
                )
              : "";
          }),
          w(
            "div",
            { class: "autocomple-item" },
            w("a", { class: "autocomplete-more" }, "Alles weergeven")
          )
        );
        appendParent.appendChild(this.dom.create(content));
      }
    });
  }

  async searchDetailResults(appendParent, data) {
    appendParent.innerHTML = "";
    const w = this.w;

    data.map(res => {
      if (res.length < 1) {
        appendParent.appendChild(
          this.dom.create(w("h2", { class: "no-results" }, "geen resultaten"))
        );
      } else {
        const content = w(
          "div",
          { class: "search-items" },
          ...res.map(result => {
            return result && result.titles.title._text && result["detail-page"]
              ? w(
                  "a",
                  {
                    class: "search-item",
                    href: result["detail-page"]._text,
                    target: "_blank"
                  },

                  result.coverimages
                    ? result.coverimages.coverimage[1]
                      ? w("img", {
                          src: result.coverimages.coverimage[1]._text
                        })
                      : w("img", {
                          src: result.coverimages.coverimage[0]._text
                        })
                    : w("div", { class: "search-image-placeholder" }),
                  result.titles && result.titles.title._text
                    ? w("h4", {}, result.titles.title._text)
                    : w("h4", {}, "Titel: niet bekend"),
                  result.authors
                    ? w(
                        "p",
                        {},
                        "Auteur: " + result.authors["main-author"]._text
                      )
                    : w("p", {}, "Auteur: niet bekend"),
                  result.summaries
                    ? w(
                        "p",
                        {},
                        "Samenvatting: " + result.summaries.summary._text
                      )
                    : w("p", {}, "Samenvatting: niet bekend"),
                  result.formats
                    ? w("p", {}, "format: " + result.formats.format._text)
                    : w("p", {}, "Format: niet bekend")
                )
              : "";
          })
        );
        appendParent.appendChild(this.dom.create(content));
      }
    });
  }
}
