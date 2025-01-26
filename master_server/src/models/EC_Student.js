import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";

export const EC_Student = sequelize.define(
    'EC_Student',
    {
        ecID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.INTEGER,
        },
        verifiedByStaff: {
            type: DataTypes.STRING,
            references: {
                model: "EC_Staff",
                key: "id",
            },
        }
    },
    {
        tableName: "EC_Student", 
    }
)