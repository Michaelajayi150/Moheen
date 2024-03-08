/* eslint-disable react/prop-types */
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

function TagSelection({ setProduct, tags }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
      case " ":
        setProduct((prev) => ({
          ...prev,
          tags: [
            ...prev.tags,
            {
              label: inputValue,
              value: inputValue,
            },
          ],
        }));
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="type">Tags</label>
      <CreatableSelect
        components={{
          DropdownIndicator: null,
        }}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) =>
          setProduct((prev) => ({ ...prev, tags: newValue }))
        }
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        className="overflow-hidden"
        value={tags}
      />
    </div>
  );
}

export default TagSelection;
