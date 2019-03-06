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

    this.app.appendChild(
      this.dom.create(
        w(
          "section",
          { class: "holder" },
          w("h1", {}, "OBA Zoeken"),
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
              {},
              w("label", { for: "searchField" }),
              w("input", {
                type: "text",
                id: "searchField",
                placeholder: "Zoeken"
              })
            )
          ),
          w(
            "section",
            { class: "search" },
            w("aside", { class: "search-filters" }),
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
