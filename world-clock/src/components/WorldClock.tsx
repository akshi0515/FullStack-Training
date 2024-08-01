import React, { useState, useEffect, useMemo } from "react";
import moment, { Moment } from "moment-timezone";
import AnalogClock from "./AnalogClock";
import { City } from "../interfaces/City";
import { cities } from "../utilities/citiesList";

const WorldClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Moment>(moment());
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);

  useEffect((): void => {
    setInterval((): void => {
      setCurrentTime(moment());
    }, 1000);
  }, []);

  const formattedTime: string = useMemo((): string => {
    return currentTime.tz(selectedCity.timezone).format("HH:mm:ss");
  }, [currentTime, selectedCity.timezone]);

  const formattedDate: string = useMemo((): string => {
    return currentTime.tz(selectedCity.timezone).format("MMMM Do, YYYY");
  }, [currentTime, selectedCity.timezone]);

  const cityButtons: JSX.Element[] = cities.map(
    (city): JSX.Element => (
      <button key={city.name} onClick={(): void => setSelectedCity(city)} className={city.name === selectedCity.name ? "active" : ""}>
        {city.name}
      </button>
    )
  );

  return (
    <div className="world-clock-container">
      <div className="menu">
        <h2>Select a City</h2>
        <div>{cityButtons}</div>
      </div>
      <div className="clock-display">
        <h2>{selectedCity.name}</h2>
        <AnalogClock currentTime={currentTime} timezone={selectedCity.timezone} />
        <p className="digital-time">{formattedTime}</p>
        <p className="digital-date">{formattedDate}</p>
      </div>
    </div>
  );
};

export default WorldClock;
