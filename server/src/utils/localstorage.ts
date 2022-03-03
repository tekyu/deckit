// @ts-nocheck
const localStorageManager = {
  getLocalStorage: () => {
    // eslint-disable-next-line no-restricted-globals
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : [];
  },

  setLocalStorage: (name: string, data: object) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      localStorage.setItem(name, JSON.stringify(data));
    } catch (e) {
      throw Error('Cannot set data to local storage. Data is not valid for JSON.stringify');
    }
  },
};

module.exports = localStorageManager;
