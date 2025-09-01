export const memStore = new Map();

export const hasLocalStorage = () => {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
};

export function saveLS(key, value) {
  try {
    if (hasLocalStorage()) localStorage.setItem(key, JSON.stringify(value));
    else memStore.set(key, JSON.stringify(value));
  } catch {
    memStore.set(key, JSON.stringify(value));
  }
}

export function loadLS(key, fallback) {
  try {
    const raw = hasLocalStorage() ? localStorage.getItem(key) : (memStore.get(key) ?? null);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}