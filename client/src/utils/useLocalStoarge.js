import React from 'react';

export const getStoredValue = (key, initialValue) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  const stored = window.localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : initialValue;

  return initial;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    return getStoredValue(key, initialValue);
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
