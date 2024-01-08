import { DataTypes } from "sequelize";
import sequelize from "../config/dbconnection.js";

const User = sequelize.define(
  "User",
  {
    username:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    role:{
      type: DataTypes.ENUM('regular', 'product_creator'),
      defaultValue: 'regular',
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  }
)
export default User