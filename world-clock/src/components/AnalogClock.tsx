import React, { useMemo } from "react";
import moment from "moment-timezone";
import { ClockHands } from "../interfaces/ClockHands";
import { AnalogClockProps } from "../interfaces/AnalogClockProps";

const AnalogClock: React.FC<AnalogClockProps> = ({ currentTime, timezone }) => {
  const { seconds, minutes, hours } = useMemo<ClockHands>(() => {
    const localTime = moment(currentTime).tz(timezone);
    const seconds = localTime.seconds() * 6;
    const minutes = localTime.minutes() * 6;
    const hours = (localTime.hours() % 12) * 30 + minutes / 12;
    return { seconds, minutes, hours };
  }, [currentTime, timezone]);

  const clockNumbers = useMemo<JSX.Element[]>(() => {
    return [...Array(12)].map((_, i) => (
      <div key={i} className="number" style={{ transform: `rotate(${i * 30}deg)` }}>
        <div style={{ transform: `rotate(${-i * 30}deg)` }}>{i === 0 ? 12 : i}</div>
      </div>
    ));
  }, []);

  return (
    <div className="analog-clock">
      <div className="dial">
        <div className="hand hour" style={{ transform: `rotate(${hours}deg)` }}></div>
        <div className="hand minute" style={{ transform: `rotate(${minutes}deg)` }}></div>
        <div className="hand second" style={{ transform: `rotate(${seconds}deg)` }}></div>
        {clockNumbers}
      </div>
    </div>
  );
};

export default AnalogClock;
