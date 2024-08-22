import { search } from "../services/Messages";

export class Search extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("search-page-template");
    const content = template.content.cloneNode(true);
    content
      .querySelector("input")
      .addEventListener("change", (e) => search(e.target.value));
    this.root.appendChild(content);
  }

  connectedCallback() {
    this.render();
    window.addEventListener("messagedatachange", () => {
      this.render();
    });
    window.addEventListener("searchdatachange", () => {
      this.render();
    });
  }

  render() {
    this.root.getElementById("search-term").textContent = app.store.searchTerm;
    const ref = this.root.querySelector(".search-results");
    if (app.store.filtered) {
      ref.innerHTML = "";
      for (let message of app.store.filtered) {
        const item = document.createElement("message-item");
        item.dataset.message = JSON.stringify(message);
        ref.appendChild(item);
      }
    } else {
      ref.innerHTML = "Loading...";
    }
  }
}

customElements.define("search-page", Search);
