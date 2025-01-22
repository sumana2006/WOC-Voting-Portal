import Sequelize from "sequelize";

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/postgres');

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}