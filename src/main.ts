import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './common/interfaces';
import { ConfigKey } from './common/enums';
import { ResponseInterceptor } from './response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  const config = app.get(ConfigService);
  const appConfig = config.get<AppConfig>(ConfigKey.App);
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://ssocsui.vercel.app',
      'https://csui-sso.vercel.app',
      'https://sso-csui.vercel.app',
      'https://ui-sso.vercel.app',
      'https://csuisso.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(appConfig.port || 3000);
}
bootstrap();
