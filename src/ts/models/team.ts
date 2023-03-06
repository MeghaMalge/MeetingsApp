import IUsers from "./users";

interface ITeams {
  _id?: string;
  name: string;
  shortName: string;
  description: string;
  members: IUsers[];
}

export default ITeams;
