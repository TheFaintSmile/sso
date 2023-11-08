import { registerAs } from '@nestjs/config';
import { ConfigKey, Environment } from 'src/common/enums';
import { AppConfig, DatabaseConfig } from 'src/common/interfaces';

const AppsConfig = registerAs(
  ConfigKey.App,
  (): AppConfig => ({
    env:
      Environment[process.env.NODE_ENV as keyof typeof Environment] || 'local',
    port: Number(process.env.APP_PORT),
    appName: process.env.APP_NAME,
  }),
);

const DBConfig = registerAs(
  ConfigKey.Database,
  (): DatabaseConfig => ({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
);

export const configurations = [AppsConfig, DBConfig];
