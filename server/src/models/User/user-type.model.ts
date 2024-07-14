import { DataTypes, Model, Optional } from "sequelize";
import sequelize  from '../../config/database';

interface UserTypeAttributes {
  id: number;
  user_type_name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface UserTypeCreationAttributes extends Optional<UserTypeAttributes, "id" | "created_at" | "updated_at"> {}

class UserType
  extends Model<UserTypeAttributes, UserTypeCreationAttributes>
  implements UserTypeAttributes
{
  public id!: number;
  public user_type_name!: string;
  public description!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

UserType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_type_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW.toString(),
    },
  },
  {
    tableName: "user_types",
    timestamps: true,
    sequelize,
  }
);

export default UserType;