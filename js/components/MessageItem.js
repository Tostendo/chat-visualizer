import { getMessages } from "../services/Messages";

export default class MessageItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("message-item-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const message = JSON.parse(this.dataset.message);
    this.querySelector("h4").textContent = message.from;
    this.querySelector(".message-date").textContent = message.created_at;
    this.querySelector(".message-content").textContent = message.content;
    this.querySelector("a").addEventListener("click", (event) => {
      app.router.go(`/message-${message.id}`);
      event.preventDefault();
    });

    if (this.dataset.highlighted === "true") {
      this.querySelector(".message-item").classList.add("highlighted");
    }
  }
}

customElements.define("message-item", MessageItem);
