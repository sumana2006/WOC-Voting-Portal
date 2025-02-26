import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";
import { POSITIONS } from "../constants/positions.js";

export const Commitment = sequelize.define(
    'Commitments',
    {
        positions: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(POSITIONS))), // Array of positions
            allowNull: false,
        },
        evm: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commitment: {                       // TO-DO : Add correct data type
            type: DataTypes.TSVECTOR,
            allowNull: false,
        }
    },
    {
        tableName: 'Commitments'
    }
)