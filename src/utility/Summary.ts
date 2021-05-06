import { Role } from "../hero/model/characteristics";

interface Summary {
  getName(): string;
  getRarity(): number;
  getRole(): Role;
}

export default Summary;
