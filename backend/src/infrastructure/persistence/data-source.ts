import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ormEntities } from './orm-entities/index.js';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'havefun',
  password: process.env.DB_PASSWORD ?? 'changeme',
  database: process.env.DB_DATABASE ?? 'havefun_courses',
  entities: ormEntities,
  migrations: ['src/infrastructure/persistence/migrations/*.ts'],
  synchronize: false,
});
