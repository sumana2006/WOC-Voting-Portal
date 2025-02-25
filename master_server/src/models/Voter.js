import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";
import { POSITIONS } from "../constants/positions.js";

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
        biometric_right: {
            type: DataTypes.STRING,
        },
        biometric_left: {
            type: DataTypes.STRING,
        },
        verfiedByVolunteer: {
            type: DataTypes.STRING,
            references: {
                model: "EC_Volunteer",
                key: "id",
            },
        },
        verifiedByStaff:{
            type: DataTypes.STRING,
            references: {
                model: "EC_Staff",
                key: "id",
            },
        },
        positions: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(POSITIONS))), // Array of positions
            allowNull: false,
        },

    },
    {
        tableName: 'Voter'
    }
)