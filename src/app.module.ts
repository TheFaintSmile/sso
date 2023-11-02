import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    // TypeOrmModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
