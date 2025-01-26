import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";

export const EC_Student = sequelize.define(
    'EC_Student',
    {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.NUMBER,
        },
        position: {
            type: DataTypes.ENUM("1", "2"), //TODO: Add correct positions
            allowNull: false,
        },
        basis: {
            type: DataTypes.STRING,
            unique: true,
        },
        verfiedByStudent: {
            references: {
                model: "EC_Student",
                key: "ecID",
            },
        },
        verifiedByStaff:{
            references: {
                model: "EC_Staff",
                key: "id",
            },
        }
    }
)