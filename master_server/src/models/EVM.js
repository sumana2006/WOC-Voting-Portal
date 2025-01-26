import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const EVM = sequelize.define("EVM", {
    public_key: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    private_key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    room: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 65535, 
        },
    },
    health: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    verifiedByStaff: {
        type: DataTypes.STRING,
        references: {
            model: "EC_Staff",
            key: "id",
        },
    }
},{
    tableName: 'EVM'
});

export default EVM;
