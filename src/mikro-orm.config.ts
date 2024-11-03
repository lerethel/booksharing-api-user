import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ForbiddenException } from '@nestjs/common';

export default defineConfig({
  dbName: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./dist/**/entities/*.entity.js'],
  entitiesTs: ['./src/**/entities/*.entity.ts'],
  debug: true,
  // A common handler if a user provides an id that doesn't exist.
  findOneOrFailHandler() {
    throw new ForbiddenException();
  },
});
