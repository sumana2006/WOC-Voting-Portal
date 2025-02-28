import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { POSITIONS } from "../constants/positions.js";

export const Commitment = sequelize.define(
    "Commitment",
    {
        positions: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Store positions as an array of strings
            allowNull: false,
            validate: {
                isValidPosition(value) {
                    value.forEach(pos => {
                        if (!Object.values(POSITIONS).includes(pos)) {
                            throw new Error(`Invalid position: ${pos}`);
                        }
                    });
                }
            }
        },
        evm: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: EVM, 
                key: "id",
            },
            // onDelete: "CASCADE", // Ensures commitments get deleted if EVM is removed
        },
        commitment: {
            type: DataTypes.TEXT, // Changed from TSVECTOR to TEXT, as TSVECTOR is specific to Postgres full-text search
            allowNull: false,
        }
    },
    {
        tableName: "Commitments",
    }
);
