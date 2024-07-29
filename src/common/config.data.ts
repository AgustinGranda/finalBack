import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORM = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Bootcamp152024',
    database: 'movies_db',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
  };
};