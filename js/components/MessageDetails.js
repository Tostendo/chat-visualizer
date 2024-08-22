import { getMessages } from "../services/Messages";

export class MessageDetails extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("message-detail-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }

  async renderData() {
    if (this.dataset.messageId) {
      this.messages = await getMessages(this.dataset.messageId);
      const ref = this.root.querySelector(".search-results");
      if (this.messages) {
        ref.innerHTML = "";
        for (let message of this.messages) {
          const item = document.createElement("message-item");
          item.dataset.message = JSON.stringify(message);
          console.info(message.id.toString(), this.dataset.messageId);
          item.dataset.highlighted =
            this.dataset.messageId === message.id.toString();
          ref.appendChild(item);
        }
      } else {
        ref.innerHTML = "Loading...";
      }
    }
  }

  connectedCallback() {
    this.renderData();
  }
}

customElements.define("message-detail-page", MessageDetails);
