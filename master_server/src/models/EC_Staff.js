import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";

export const EC_Staff = sequelize.define(
    'EC_Staff',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        
    },{
        tableName: 'EC_Staff'
    }
)