import { Sequelize, DataTypes } from "sequelize"
import { connectDB, sequelize } from "../db/db.js";

connectDB();



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
    }
)