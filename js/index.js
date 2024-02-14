const data = require("../monthly.json");
const users = require("../users.json");

// populate
// populateTable(data);
const xValues = data.map((e) => e["month"]);

new Chart("messageCount", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: Object.values(users)[0],
        data: data.map((e) => e[Object.keys(users)[0]]),
        borderColor: "red",
        fill: false,
      },
      {
        label: Object.values(users)[1],
        data: data.map((e) => e[Object.keys(users)[1]]),
        borderColor: "green",
        fill: false,
      },
    ],
  },
});

new Chart("wordCount", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: Object.values(users)[0],
        data: data.map((e) => e[`${Object.keys(users)[0]}_words`]),
        borderColor: "red",
        fill: false,
      },
      {
        label: Object.values(users)[1],
        data: data.map((e) => e[`${Object.keys(users)[1]}_words`]),
        borderColor: "green",
        fill: false,
      },
    ],
  },
});

new Chart("wordPerMessageCount", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: Object.values(users)[0],
        data: data.map(
          (e) => e[`${Object.keys(users)[0]}_words`] / e[Object.keys(users)[0]]
        ),
        borderColor: "red",
        fill: false,
      },
      {
        label: Object.values(users)[1],
        data: data.map(
          (e) => e[`${Object.keys(users)[1]}_words`] / e[Object.keys(users)[1]]
        ),
        borderColor: "green",
        fill: false,
      },
    ],
  },
});
