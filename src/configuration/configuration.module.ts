import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local", ".env"],
      load: [...configurations],
      isGlobal: true,
    }),
  ],
})

export class ConfigurationModule {}
