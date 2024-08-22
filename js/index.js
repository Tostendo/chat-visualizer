import { search } from "./services/Messages.js";
import Store from "./services/store.js";
import Router from "./services/router.js";
// import "./charts";

// web components
import { Stats } from "./components/Stats.js";
import { Search } from "./components/Search.js";
import { Home } from "./components/Home.js";
import { MessageDetails } from "./components/MessageDetails.js";
import { MessageItem } from "./components/MessageItem.js";
import { Links } from "./components/Links.js";

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {
  const chatId = localStorage.getItem("chat-id");
  app.store.chatId = chatId ?? "example";
  search("kakao");
  app.router.init();
});
