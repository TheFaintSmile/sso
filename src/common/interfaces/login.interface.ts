import { User } from '../entities';

export interface LoginInterface {
  refreshToken: string;
  accessToken: string;
  user: User;
}
