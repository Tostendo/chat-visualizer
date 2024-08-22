import Api from "./api.js";

export async function getMessages(id, before = 5, after = 5) {
  const chatId = app.store.chatId;
  const surroundingMessages = await Api.getMessageDetails(id, chatId);
  return surroundingMessages["data"];
}

export async function search(query) {
  app.store.searchTerm = query;
  const chatId = app.store.chatId;
  const filtered = await Api.search(query, chatId);
  if (filtered) {
    app.store.filtered = Object.values(filtered);
  }
}

export async function upload(form) {
  const result = await Api.upload(form);
  app.store.chatId = result["data"];
  localStorage.setItem("chat-id", result["data"]);
  return result;
}

export async function reset() {
  return await Api.reset();
}
