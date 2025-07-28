import { StaticImageData } from "next/image";
import { Avatar } from "./assets";

export interface User {
  id?: string;
  name: string;
  avatar?: StaticImageData;
  email?: string;
}
export const user: User = {
  name: "Adedeji",
  avatar: Avatar,
  email: "adedeji@lendsqr.com",
};
