import { User } from '../entities';

export interface LoginInterface {
  refreshToken: string;
  accessToken: string;
  user: User;
}

export interface IToken {
  sub: string;
  user: string;
  iat: number;
  exp: number;
}
