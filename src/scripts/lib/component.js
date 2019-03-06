import DOM from "./dom";

export default class Component {
  constructor() {
    this.dom = new DOM();
    this.app = document.querySelector("#app");
  }
  clean() {
    this.app.innerHTML = "";
  }
}
