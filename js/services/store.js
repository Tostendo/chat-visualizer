const Store = {
  data: [],
  filtered: [],
  searchTerm: "",
  chatId: "example",
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "data") {
      window.dispatchEvent(new Event("messagedatachange"));
    }
    if (property == "filtered") {
      window.dispatchEvent(new Event("searchdatachange"));
    }
    return true;
  },
});

export default proxiedStore;
