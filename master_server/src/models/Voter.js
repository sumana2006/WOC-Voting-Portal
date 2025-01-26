import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";

export const Voter = sequelize.define(
    'Voter',
    {
        voterId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        biometricData: {
            type: DataTypes.STRING,
        },
        verfiedByStudent: {
            type: DataTypes.STRING,
            references: {
                model: "EC_Student",
                key: "ecID",
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
        tableName: 'Voter'
    }
)