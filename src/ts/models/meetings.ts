import IUsers from "./users";

interface IMeetings {
  _id?: string;
  name: string;
  description: string;
  date: string;
  startTime: {
    hours: string;
    minutes: string;
  };
  endTime: {
    hours: string;
    minutes: string;
  };
  attendees: IUsers[] | string[];
}

export default IMeetings;
