import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js";

export const Commitment = sequelize.define(
    'Commitments',
    {
        positionIndex: {
            type: DataTypes.INTEGER
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