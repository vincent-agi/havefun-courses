import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ormEntities } from './orm-entities/index.js';

export function typeOrmConfigFactory(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'mariadb',
    host: config.get<string>('DB_HOST', 'localhost'),
    port: config.get<number>('DB_PORT', 3306),
    username: config.get<string>('DB_USERNAME', 'havefun'),
    password: config.get<string>('DB_PASSWORD', 'changeme'),
    database: config.get<string>('DB_DATABASE', 'havefun_courses'),
    entities: ormEntities,
    synchronize: false,
    autoLoadEntities: false,
  };
}
