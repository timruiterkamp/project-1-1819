import Store from "../store/index.js";
import eventHandler from "../utils/eventHandler.js";
require("dotenv").config();
import { API } from "../../../node_modules/oba-wrapper/js/index";

class ApiCall {
  constructor() {}

  autoComplete(value) {
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

  async searchDetail(value) {
    const api = new API({
      key: process.env.OBA_PUBLIC
    });
    const stream = await api.createStream(`search/${value}`);

    try {
      return await stream.all();
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async searchAutoComplete(value, amount) {
    const api = new API({
      key: process.env.OBA_PUBLIC
    });
    const stream = await api.createStream(`search/${value}{${amount}}`);

    try {
      return await stream.all();
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default class GetData extends ApiCall {
  async searchAutoCompleteValue(value, amount) {
    return await super.searchAutoComplete(value, amount);
  }

  async searchValue(value) {
    console.log(value);
    return await super.searchDetail(value);
  }
}
