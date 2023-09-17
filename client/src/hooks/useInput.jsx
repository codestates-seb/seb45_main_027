import { useState } from "react";

const useInput = (initialValue) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const clearInput = () => setInputValue(initialValue);

  return [inputValue, handleInputChange, clearInput];
};

export default useInput;
