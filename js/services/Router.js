const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        Router.go(url);
      });
      window.addEventListener("popstate", (event) => {
        Router.go(event.state.route, false);
      });
    });
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log("Go to route " + route);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("home-page");
        break;
      case "/stats":
        pageElement = document.createElement("stats-page");
        break;
      case "/search":
        pageElement = document.createElement("search-page");
        break;
      case "/links":
        pageElement = document.createElement("links-page");
        break;
      default:
        if (route.startsWith("/message-")) {
          pageElement = document.createElement("message-detail-page");
          pageElement.textContent = "Message detail";
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          console.info("params: ", paramId);
          pageElement.dataset.messageId = paramId;
        }
    }
    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.append(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
