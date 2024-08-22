import Api from "./api.js";

export async function loadData() {
  const fetched = await Api.getAggregates(app.store.chatId);
  return fetched;
}
