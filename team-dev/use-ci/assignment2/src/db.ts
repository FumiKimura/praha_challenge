import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "testdb",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "postgres",
  {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);

export { sequelize };
