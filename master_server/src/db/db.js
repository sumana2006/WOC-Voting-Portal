import Sequelize from "sequelize";

// const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/postgres');

export const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}