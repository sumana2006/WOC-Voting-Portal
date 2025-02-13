import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";

export const Candidate = sequelize.define(
    'Candidate',
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
            type: DataTypes.STRING,
            references: {
                model: "EC_Student",
                key: "id",
            },
        },
        verifiedByStaff:{
            type: DataTypes.STRING,
            references: {
                model: "EC_Staff",
                key: "id",
            },
        }
    },
    {
        tableName: 'Candidate'
    }
)