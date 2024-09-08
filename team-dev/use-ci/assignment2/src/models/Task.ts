import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tasks",
  }
);

export { Task };
