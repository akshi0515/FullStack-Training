import { Moment } from "moment-timezone";

export interface AnalogClockProps {
  currentTime: Moment;
  timezone: string;
}
