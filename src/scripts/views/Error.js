import Component from "../lib/component";
import Store from "../store/index";

export default class ErrorTemplate extends Component {
  constructor() {
    super();
  }

  async render(error, message) {
    this.clean();

    const w = this.dom.write;

    this.app.appendChild(
      this.dom.create(
        w(
          "section",
          { class: "error" },
          w("h1", {}, error),
          w("p", {}, message),
          w("a", { class: "back", href: "/" }, "Go back to the homepage")
        )
      )
    );
  }

  async after_render() {
    Store.dispatch("setLoading", true);
  }
}
