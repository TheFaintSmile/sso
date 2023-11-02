import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async getTest(): Promise<string> {
    return 'Hello World!';
  }

  public async getErrors(): Promise<string> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  public async login(): Promise<string> {
    return 'Login successful!';
  }
}
