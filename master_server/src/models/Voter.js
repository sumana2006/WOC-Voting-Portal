import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { POSITIONS } from "../constants/positions.js";

// Define Voter model
export const Voter = sequelize.define(
    "Voter",
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
        verifiedByStaff: {
            type: DataTypes.STRING,
            references: {
                model: "EC_Staff",
                key: "id",
            },
        },
        allowedPositions: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Storing an array of allowed positions
            allowNull: false,
            defaultValue: [],
            validate: {
                isValidPosition(value) {
                    value.forEach(pos => {
                        if (!Object.values(POSITIONS).includes(pos)) {
                            throw new Error(`Invalid position: ${pos}`);
                        }
                    });
                }
            }
        }
    },
    {
        tableName: "Voter",
    }
);
