import { useState } from "react";

function useLocalstorage(keyName) {
  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem(keyName)) || []
  );
  function set(object) {
    if (!localStorage.getItem(keyName)) {
      localStorage.setItem(keyName, JSON.stringify([object]));
    } else {
      const newItems = [...JSON.parse(localStorage.getItem(keyName)), object];
      localStorage.setItem(keyName, JSON.stringify(newItems));
    }
    setItem(() => JSON.parse(localStorage.getItem(keyName)));
  }
  function del(id) {
    const newItems = JSON.parse(localStorage.getItem(keyName)).filter(
      (ele) => ele.id !== id
    );
    localStorage.setItem(keyName, JSON.stringify(newItems));
    setItem(() => JSON.parse(localStorage.getItem(keyName)));
  }
  return [item, set, del];
}

export { useLocalstorage };
