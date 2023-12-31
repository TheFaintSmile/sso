import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { Token, User } from 'src/common/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User, Token]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
