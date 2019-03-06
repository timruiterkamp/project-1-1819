import Component from "../lib/component";
import ErrorTemplate from "../views/Error";
import LoadingTemplate from "../views/Loading";

export default class eventHandler extends Component {
  constructor(props) {
    super(props);
    this.w = this.dom.write;
  }

  loading(container) {
    const loadingPage = new LoadingTemplate();
    loadingPage.render(container);
  }

  async error(error, message) {
    const errorPage = new ErrorTemplate();
    await errorPage.render(error, message);
    await errorPage.after_render();
  }
}
