import Component from "../lib/component";
import { Requests } from "../requests/requests";
import eventHandler from "../utils/eventHandler";
import Store from "../store/index";
import { initSearch } from "../utils/search";

export default class Home extends Component {
  constructor() {
    super();
  }

  async render() {
    this.clean();

    const w = this.dom.write;
    const header = document.querySelector("#header");
    console.log(header);
    header.appendChild(
      this.dom.create(
        w(
          "div",
          { class: "header-wrapper" },
          w("img", {
            src: "https://www.oba.nl/content/dam/logo/oba100-logo.jpg"
          }),
          w(
            "nav",
            {},
            w(
              "ul",
              {},
              w(
                "li",
                {},
                w(
                  "a",
                  {
                    href: "https://www.oba.nl/veelgestelde-vragen.html",
                    target: "_blank"
                  },
                  "FAQ"
                )
              ),
              w(
                "li",
                {},
                w(
                  "a",
                  {
                    href: "https://www.oba.nl/contactgegevens.html",
                    target: "_blank"
                  },
                  "Contact"
                )
              ),
              w(
                "li",
                {},
                w(
                  "a",
                  {
                    href:
                      "https://www.oba.nl/service/lidmaatschap-en-tarieven/word-lid.html",
                    target: "_blank"
                  },
                  "Word lid"
                )
              )
            )
          )
        )
      )
    );

    this.app.appendChild(
      this.dom.create(
        w(
          "section",
          { class: "holder" },
          w("h1", { class: "title" }, "OBA Zoeken"),
          w("div", { class: "background-circle" }),
          w(
            "p",
            { class: "subcontent" },
            "Doorzoek de bibliotheekcatalogus van de Openbare Bibliotheek Amsterdam. Typ één of meer woorden in het zoekvak en druk op Enter."
          ),
          w(
            "section",
            { class: "form-wrapper" },
            w(
              "form",
              { class: "search-form" },
              w("label", { for: "searchField" }),
              w("input", {
                type: "text",
                id: "searchField",
                placeholder: "Zoeken"
              })
            ),
            w("div", { class: "autocomplete-results hidden" })
          ),
          w(
            "section",
            { class: "search" },
            w(
              "aside",
              { class: "search-filters hidden" },
              w(
                "div",
                { class: "filters-wrapper" },
                w("h3", {}, "Filters"),
                w(
                  "section",
                  { class: "filters" },
                  w(
                    "label",
                    { for: "books" },
                    "Books",
                    w("input", { type: "checkbox", id: "books" })
                  ),
                  w(
                    "label",
                    { for: "dvd" },
                    "DVD",
                    w("input", { type: "checkbox", id: "dvd" })
                  ),
                  w(
                    "label",
                    { for: "audio" },
                    "Audio",
                    w("input", { type: "checkbox", id: "audio" })
                  )
                )
              )
            ),
            w("section", { class: "search-results" })
          )
        )
      )
    );
  }

  async after_render() {
    const events = new eventHandler();
    if (Store.state.loading) {
      events.loading();
    }
    await initSearch();
  }
}
