import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";
import { POSITIONS } from "../constants/positions.js";

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
        positions: {
            type: DataTypes.ENUM(...Object.values(POSITIONS)),
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
        verifiedByStaff: {
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