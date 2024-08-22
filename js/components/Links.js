import { loadData } from "../services/Aggregates";

export class Links extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("links-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const jsonData = await loadData();
    console.info(jsonData);
    const ref = this.root.getElementById("links-list");
    for (const [key, value] of Object.entries(jsonData)) {
      var row = document.createElement("tr");
      var dataEl = document.createElement("td");
      dataEl.innerText = key;
      row.appendChild(dataEl);
      dataEl = document.createElement("td");
      var tmp = document.createElement("ul");
      for (let link of value["a_links"]) {
        var listEntry = document.createElement("li");
        var linkCom = document.createElement("a");
        linkCom.innerText = link;
        linkCom.href = link;
        linkCom.target = "_blank";
        listEntry.appendChild(linkCom);
        tmp.appendChild(listEntry);
      }
      dataEl.appendChild(tmp);
      row.appendChild(dataEl);
      dataEl = document.createElement("td");
      var tmp = document.createElement("ul");
      for (let link of value["b_links"]) {
        var listEntry = document.createElement("li");
        var linkCom = document.createElement("a");
        linkCom.innerText = link;
        linkCom.href = link;
        linkCom.target = "_blank";
        listEntry.appendChild(linkCom);
        tmp.appendChild(listEntry);
      }
      dataEl.appendChild(tmp);
      row.appendChild(dataEl);
      ref.appendChild(row);
    }
  }
}

customElements.define("links-page", Links);
