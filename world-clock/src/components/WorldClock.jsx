import React, { useState, useEffect, useMemo, useCallback } from "react";
import moment from "moment-timezone";
import AnalogClock from "./AnalogClock";

const cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "India", timezone: "Asia/Kolkata" },
];

const WorldClock = ()=> {
  const [currentTime, setCurrentTime] = useState(moment());
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    return currentTime.tz(selectedCity.timezone).format("HH:mm:ss");
  }, [currentTime, selectedCity.timezone]);

  const formattedDate = useMemo(() => {
    return currentTime.tz(selectedCity.timezone).format("MMMM Do, YYYY");
  }, [currentTime, selectedCity.timezone]);

  const handleCityChange = useCallback((city) => {
    setSelectedCity(city);
  }, []);

  const cityButtons = cities.map((city) => (
    <button
      key={city.name}
      onClick={() => handleCityChange(city)}
      className={city.name === selectedCity.name ? "active" : ""}
    >
      {city.name}
    </button>
  ));

  return (
    <div className="world-clock-container">
      <div className="menu">
        <h2>Select a City</h2>
        <div>{cityButtons}</div>
      </div>
      <div className="clock-display">
        <h2>{selectedCity.name}</h2>
        <AnalogClock
          currentTime={currentTime}
          timezone={selectedCity.timezone}
        />
        <p className="digital-time">{formattedTime}</p>
        <p className="digital-date">{formattedDate}</p>
      </div>
    </div>
  );
}

export default WorldClock;
