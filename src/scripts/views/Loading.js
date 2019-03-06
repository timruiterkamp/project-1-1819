import Component from "../lib/component";

export default class LoadingTemplate extends Component {
  constructor() {
    super();
  }

  async render(container) {
    this.clean();

    const w = this.dom.write;
    const body = container ? container : this.app;

    body.appendChild(
      this.dom.create(w("section", { class: "loading" }, w("h1", {}, "Laden")))
    );
  }

  async after_render() {}
}
