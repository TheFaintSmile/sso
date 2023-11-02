import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/common/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/test/')
  public async getTest(): Promise<string> {
    return this.authService.getTest();
  }

  @Get('/error/') // This would give an error endpoint just to prove that the interceptor works
  public async getErrors(): Promise<string> {
    return this.authService.getErrors();
  }

  @Post('/login/')
  public async login(@Body() loginDTO: LoginDTO): Promise<string> {
    console.log('loginDTO', loginDTO);
    return this.authService.login();
  }
}
