import "reflect-metadata";
import { DataSource } from "typeorm";
import { Resource } from "./entities/resource.entity.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  url:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/postgres",
  synchronize: false,
  logging: false,
  entities: [Resource],
  subscribers: [],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});

export async function initDataSource(): Promise<DataSource> {
  if (AppDataSource.isInitialized) return AppDataSource;
  return AppDataSource.initialize();
}
