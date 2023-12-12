import React from "react";

function TopButtons({ setCountry }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Tokyo",
    },
    {
      id: 3,
      title: "Paris",
    },
    {
      id: 4,
      title: "Berlin",
    },
    {
      id: 5,
      title: "Athens",
    },
  ];

  const changeCountry = (value) => {
    setCountry(value);
  };

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => changeCountry(city.title)}
          className="text-white text-lg font-medium transition ease-out hover:scale-125"
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
