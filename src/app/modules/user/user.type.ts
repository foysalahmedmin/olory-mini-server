import { TRole } from "../../types/role.type";

export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: TRole;
  status: "inProgress" | "blocked";
  isDeleted: boolean;
};
