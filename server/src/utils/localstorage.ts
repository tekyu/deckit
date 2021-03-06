const localStorageManager = {
  getLocalStorage: () => {
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : [];
  },

  setLocalStorage: (name: string, data: object) => {
    try {
      const json = JSON.stringify(data);
    } catch (e) {
      throw 'Cannot set data to local storage. Data is not valid for JSON.stringify';
    }
    localStorage.setItem(name, JSON.stringify(data));
  }
};

module.exports = localStorageManager;
