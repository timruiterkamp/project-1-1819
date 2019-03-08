import Component from "../lib/component";

export default class Generate extends Component {
  constructor() {
    super();
    this.w = this.dom.write;
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
            return result && result.title
              ? w(
                  "div",
                  {
                    class: "autocomplete-item"
                  },

                  w(
                    "div",
                    { class: "autocomplete-image" },
                    result.images && result.images !== undefined
                      ? w("img", {
                          src: result.images[0]
                        })
                      : w("div", { class: "autocomplete-image-placeholder" })
                  ),
                  w(
                    "div",
                    { class: "autocomplete-text" },
                    result.title && result.title.full !== undefined
                      ? w("h4", {}, result.title.full)
                      : w("h4", {}, "Titel: niet bekend"),

                    result.author && result.author.fullname !== undefined
                      ? w("p", {}, "Auteur: " + result.author.fullname)
                      : w("p", {}, "Auteur: niet bekend"),
                    result.summary && result.summary !== undefined
                      ? w("p", {}, result.summary)
                      : w("p", {}, "Samenvatting: niet bekend"),
                    result.format && result.format !== undefined
                      ? w("p", {}, "format: " + result.format)
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
            return result && result !== undefined
              ? w(
                  "div",
                  {
                    class: "search-item"
                  },

                  result.images && result.images !== undefined
                    ? result.images[1]
                      ? w("img", {
                          src: result.images[1]
                        })
                      : w("img", {
                          src: result.images[0]
                        })
                    : w("div", { class: "search-image-placeholder" }),
                  result.title && result.title.full !== undefined
                    ? w("h4", {}, result.title.full)
                    : w("h4", {}, "Titel: niet bekend"),
                  result.author && result.author.fullname !== undefined
                    ? w("p", {}, "Auteur: " + result.author.fullname)
                    : w("p", {}, "Auteur: niet bekend"),
                  result.summary && result.summary !== undefined
                    ? w("p", {}, "Samenvatting: " + result.summary)
                    : w("p", {}, "Samenvatting: niet bekend"),
                  result.format && result.format !== undefined
                    ? w("p", {}, "format: " + result.format)
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
