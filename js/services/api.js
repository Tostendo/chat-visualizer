const Api = {
  search: async (query, chatId) => {
    const result = await fetch(
      `http://localhost:8080/search?q=${query}&chat_id=${chatId}`
    );
    return await result.json();
  },

  upload: async (form) => {
    const result = await fetch(`http://localhost:8080/upload`, {
      method: "post",
      body: new FormData(form),
    });
    return await result.json();
  },

  reset: async () => {
    return await fetch(`http://localhost:8080/reset`, {
      method: "post",
      body: null,
    });
  },

  getMessageDetails: async (messageId, chatId) => {
    const result = await fetch(
      `http://localhost:8080/message/${messageId}?chat_id=${chatId}`
    );
    return await result.json();
  },

  getAggregates: async (chatId) => {
    const result = await fetch(
      `http://localhost:8080/aggregates?chat_id=${chatId}`
    );
    return await result.json();
  },
};

export default Api;
