import { DataTypes, Model, Optional } from 'sequelize';
import sequelize  from '../config/database';

export interface JobAttributes {
  id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JobCreationAttributes = Optional<JobAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public salary!: number;
  public location!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Job.init(
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Jobs',
  }
);

export { Job };