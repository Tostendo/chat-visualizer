import { loadData } from "../services/Aggregates";

export class Stats extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("stats-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const { Chart, registerables } = await import("chart.js");
    Chart.register(...registerables);
    const jsonData = await loadData();

    const xValues = Object.keys(jsonData);
    let aName = Object.values(jsonData)[0]["a_name"];
    let bName = Object.values(jsonData)[0]["b_name"];
    const yValues = Object.values(jsonData);
    new Chart(this.shadowRoot.getElementById("messageCount"), {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: aName,
            data: yValues.map((e) => e["a_count"]),
            borderColor: "red",
            fill: false,
          },
          {
            label: bName,
            data: yValues.map((e) => e["b_count"]),
            borderColor: "green",
            fill: false,
          },
        ],
      },
    });

    new Chart(this.shadowRoot.getElementById("wordCount"), {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: aName,
            data: yValues.map((e) => e["a_word_count"]),
            borderColor: "red",
            fill: false,
          },
          {
            label: bName,
            data: yValues.map((e) => e["b_word_count"]),
            borderColor: "green",
            fill: false,
          },
        ],
      },
    });

    new Chart(this.shadowRoot.getElementById("wordPerMessageCount"), {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: aName,
            data: yValues.map((e) => e["a_count"] / e["a_word_count"]),
            borderColor: "red",
            fill: false,
          },
          {
            label: bName,
            data: yValues.map((e) => e["b_count"] / e["b_word_count"]),
            borderColor: "green",
            fill: false,
          },
        ],
      },
    });
  }
}

customElements.define("stats-page", Stats);
