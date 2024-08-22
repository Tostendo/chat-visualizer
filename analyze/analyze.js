const fs = require("fs");

function writeData(fileName, data) {
  const stringfied = JSON.stringify(data, null, 4);

  // write JSON string to a file
  fs.writeFile(`./${fileName}`, stringfied, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}

function summarize(fileName) {
  const data = require(`../data/${fileName}`);
  const messages = data["messages"];
  const withCount = addWordCount(messages);
  const users = getUniqueUsers(withCount);
  const allMonths = getUniqueMonth(withCount);
  let summary = {};
  allMonths.forEach((month) => {
    summary[month] = {};
    Object.keys(users).forEach((userId) => {
      const filtered = withCount.filter(
        (m) => m["from_id"] === userId && m["year_and_month"] === month
      );
      summary[month][userId] = filtered.length;
      summary[month][`${userId}_words`] = filtered
        .map((m) => m["word_count"])
        .reduce((partialSum, a) => partialSum + a, 0);
      summary[month]["month"] = month;
    });
  });
  const tmp = {
    ...summary,
  };
  writeData("monthly.json", Object.values(tmp));
  writeData("users.json", users);
  return Object.values(tmp);
}

function getUniqueUsers(messages) {
  const ids = messages
    .map((message) => message["from_id"])
    .filter((id) => id !== undefined);
  const unique = new Set(ids);
  let all = {};
  unique.forEach((id) => {
    let realName = messages.find((e) => e["from_id"] === id);
    all[id] = realName["from"];
  });
  return all;
}

function addWordCount(messages) {
  return messages.map((message) => {
    const createdAt = new Date(message["date"]);
    createdAt.get;
    return {
      ...message,
      word_count: getWordCount(message["text_entities"]),
      year_and_month: Number.parseInt(
        `${createdAt.getFullYear()}${
          getWeek(createdAt) < 10 ? "0" : ""
        }${getWeek(createdAt)}`
      ),
    };
  });
}

function getWordCount(entities) {
  const actualMessages = entities.filter(
    (entity) => entity["type"] === "plain"
  );
  const initialValue = 0;
  return actualMessages.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue["text"].trim().split(" ").length,
    initialValue
  );
}

function getWeek(currentDate) {
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
}

function getUniqueMonth(messages) {
  const months = messages
    .map((message) => message["year_and_month"])
    .filter((id) => id !== undefined);
  const unique = new Set(months);
  return Array.from(unique).sort();
}

summarize("result.json");
