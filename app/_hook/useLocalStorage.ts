import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialValue: any = {}) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);

  const setValue = (value: any) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
