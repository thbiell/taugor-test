export const TOKEN_KEY = "@taugor-token";
export const ITEM_KEY = "@taugor-item";
export const URL_KEY = "@taugor-url";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getItem = () => localStorage.getItem(ITEM_KEY);
export const getUrl = () => localStorage.getItem(URL_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  removeUrl();
  removeItem();
};

export const setItem = item => {
  localStorage.setItem(ITEM_KEY, item);
};

export const removeItem = () => {
  localStorage.removeItem(ITEM_KEY);
};

export const setUrl = item => {
  localStorage.setItem(URL_KEY, item);
};

export const removeUrl = () => {
  localStorage.removeItem(URL_KEY);
};