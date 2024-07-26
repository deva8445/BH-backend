import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const dataBaseType = "postgres";

export const AppDataSource = new DataSource({
  host: process.env.DB_HOST,
  type: dataBaseType,
  username: dataBaseType,
  port: 5432,
  password: "new_password",
  database: "book-house",
  entities: ["src/**/*.module{.ts,.js,.tsx}"],
  migrations: ["src/modules/migration/**/*.ts"],
  synchronize: true,
  logging: false,
});
