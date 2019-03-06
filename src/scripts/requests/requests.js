import Store from "../store/index";
import Generate from "../utils/generate";
import { parseDate } from "../utils/clean";
import Component from "../lib/component";
import eventHandler from "../utils/eventHandler";

export class Requests extends Component {
  constructor() {
    super();
    this.generate = new Generate();
    this.w = this.dom.write;
  }
}
