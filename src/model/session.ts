import { UserInfo }  from "./user-info";

export type Session = {
  accessToken: string;
  userInfo: UserInfo;
} | null;
