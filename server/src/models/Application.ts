import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Job from './Job';

class Application extends Model<InferAttributes<Application>, InferCreationAttributes<Application>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare jobId: ForeignKey<Job['id']>;
  declare status: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Job,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Application',
  }
);

export default Application;