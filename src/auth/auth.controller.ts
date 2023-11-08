import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/common/dtos';
import { LoginInterface } from 'src/common/interfaces';
import { Public } from 'src/common/middlewares';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('/test/')
  public async getTest(): Promise<string> {
    return this.authService.getTest();
  }

  @Public()
  @Get('/error/') // This would give an error endpoint just to prove that the interceptor works
  public async getErrors(): Promise<string> {
    return this.authService.getErrors();
  }

  @Public()
  @Post('/login/')
  public async login(@Body() loginDTO: LoginDTO): Promise<LoginInterface> {
    const { ticket } = loginDTO;
    const response = await this.authService.login(ticket);

    return response;
  }
}
