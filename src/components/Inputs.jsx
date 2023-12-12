import React, { useState } from "react";
import { UilSearch, UilCelsius, UilFahrenheit } from "@iconscout/react-unicons";

function Inputs({ setCountry, setUnits, units }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearch() {
    setCountry(searchQuery);
    setSearchQuery(""); // Clear the input after setting the country
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function changeUnits(unitType) {
    setUnits(unitType);
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-4/5 items-center justify-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="text-xl font-light p-2 mr-4 focus:outline-none capitalize placeholder:lowercase"
          placeholder="Search..."
        />
        <UilSearch
          size={25}
          onClick={handleSearch}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
      </div>

      <div className="flex flex-row w-1/12 items-center justify-center">
        <button
          name="metric"
          onClick={() => changeUnits("metric")}
          className={`text-xl font-light text-white`}
        >
          <UilCelsius className="transition ease-out hover:scale-125" />
        </button>
        <p className="text-white text-xl mx-1">|</p>
        <button
          name="imperial"
          onClick={() => changeUnits("imperial")}
          className={`text-xl font-light text-white`}
        >
          <UilFahrenheit className="transition ease-out hover:scale-125" />
        </button>
      </div>
    </div>
  );
}

export default Inputs;
