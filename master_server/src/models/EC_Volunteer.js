import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";

export const EC_Volunteer = sequelize.define(
    'EC_Volunteer',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
        },
        biometric_right: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        biometric_left: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: "EC_Volunteer", 
    }
)