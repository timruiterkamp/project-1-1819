import Home from "./views/HomePage";
import Store from "./store/index";
import eventHandler from "./utils/eventHandler";

// Source used: https://dev.to/rishavs/making-a-single-page-app-in-ye-good-olde-js-es6-3eng
export const initRouter = () => {
  const routes = {
    "/": new Home()
  };

  const parseRequestURL = () => {
    const url = location.hash.slice(1).toLowerCase() || "/";
    const r = url.split("/");
    const request = {
      resource: null,
      id: null,
      verb: null
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];
    return request;
  };

  const renderTemplate = async () => {
    const request = parseRequestURL();

    const parsedURL =
      (request.resource ? "/#/" + request.resource : "/") +
      (request.id ? "/:id" : "") +
      (request.verb ? "/" + request.verb : "");

    if (routes[parsedURL]) {
      const page = routes[parsedURL];
      await page.render();
      await page.after_render();
    } else {
      const events = new eventHandler();
      events.error(
        "404",
        "Deze pagina bestaat niet, probeer een andere pagina"
      );
    }
  };

  window.addEventListener("hashchange", renderTemplate);
  window.addEventListener("load", renderTemplate);
};
