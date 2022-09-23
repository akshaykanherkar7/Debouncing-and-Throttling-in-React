import React, { useEffect, useRef, useState } from "react";
import countries from "../Utils/countries";
import { useThrottle } from "use-throttle";

const SearchBar = () => {
    const [inputText, setInputText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState("");

  const throttledText = useThrottle(inputText, 5000);

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    setQuery(throttledText);
  }, [setQuery, throttledText]);

  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    } else {
      let newListOfSuggestions = countries
        .filter((item) =>
          item.country.toLowerCase().indexOf(query) !== -1 ? true : false
        )
        .map((item) => item.country);
      setSuggestions(newListOfSuggestions);
    }
  }, [query]);

  return (
    <div>
      <h1>Search Bar</h1>
      <div>Query is: {query}</div>
      <input type="text" value={inputText} onChange={handleOnChange} />
      <div>
        {suggestions.length > 0 &&
          suggestions.map((item, index) => {
            return <div key={item}>{item}</div>;
          })}
      </div>
    </div>
  );
};

export default SearchBar;
