import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/common/dtos';
import { LoginInterface } from 'src/common/interfaces';
import { Public } from 'src/common/middlewares';
import { User } from 'src/common/entities';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Get('/profile/')
  public async profile(@Request() req): Promise<User> {
    const { sub } = req.user;

    return await this.authService.profile(sub);
  }

  // @Post('/logout/')
  // public async logout(@Request() req): Promise<string> {
  //   const { sub } = req.user;

  //   return await '';
  // }
}
