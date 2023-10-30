import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './common/interfaces';
import { ConfigKey } from './common/enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  const config = app.get(ConfigService);
  const appConfig = config.get<AppConfig>(ConfigKey.App);

  await app.listen(appConfig.port || 3000);
}
bootstrap();
