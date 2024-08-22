import { search, upload, reset } from "../services/Messages";

export class Home extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("home-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }

  connectedCallback() {
    this.root.getElementById("uploaded-id").textContent = app.store.chatId;
    this.root
      .getElementById("delete-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        console.info("reset clicked");
        reset().then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          this.root.getElementById("uploaded-id").textContent = "example";
          app.store.chatId = "example";
          search("kakao");
          app.router.go("/stats");
        });
      });
    const form = this.root.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      upload(form).then((res) => {
        this.root.getElementById("uploaded-id").textContent = app.store.chatId;
        search("kakao");
        app.router.go("/stats");
      });
    });
  }
}

customElements.define("home-page", Home);
