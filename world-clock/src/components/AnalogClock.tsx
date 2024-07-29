import React, { useMemo } from "react";
import moment from "moment-timezone";
import { ClockHands } from "../interfaces/ClockHands";
import { AnalogClockProps } from "../interfaces/AnalogClockProps";
import ClockNumbers from "./ClockNumbers";

const AnalogClock: React.FC<AnalogClockProps> = ({ currentTime, timezone }: AnalogClockProps) => {
  const { seconds, minutes, hours } = useMemo<ClockHands>((): ClockHands => {
    const localTime = moment(currentTime).tz(timezone);
    const seconds = localTime.seconds() * 6;
    const minutes = localTime.minutes() * 6;
    const hours = (localTime.hours() % 12) * 30 + minutes / 12;
    return { seconds, minutes, hours };
  }, [currentTime, timezone]);

  return (
    <div className="analog-clock">
      <div className="dial">
        <div className="hand hour" style={{ transform: `rotate(${hours}deg)` }}></div>
        <div className="hand minute" style={{ transform: `rotate(${minutes}deg)` }}></div>
        <div className="hand second" style={{ transform: `rotate(${seconds}deg)` }}></div>
        <ClockNumbers />
      </div>
    </div>
  );
};

export default AnalogClock;
