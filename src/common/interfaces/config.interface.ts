export interface AppConfig {
    env: string;
    appName: string;
    port: number;
}
  
export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
}