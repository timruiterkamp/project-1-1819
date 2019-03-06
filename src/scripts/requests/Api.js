import Store from "../store/index.js";
import eventHandler from "../utils/eventHandler.js";
require("dotenv").config();

class ApiCall {
  constructor() {}

  fetcher(value) {
    try {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      return fetch(
        `${proxy}https://autocomplete.aquabrowser.com/v1/oba/search?q=${value}&alpha=0.8&hl=true&p=oba`
      )
        .then(res => res.text())
        .then(data => {
          Store.dispatch("setLoading", false);
          return JSON.parse(data);
        });
    } catch {
      const event = new eventHandler();
      event.error("503", "data kon niet worden opgehaald, teveel api requests");
    }
  }
}

export default class GetData extends ApiCall {
  async searchValue(value) {
    return await super.fetcher(value);
  }
}
