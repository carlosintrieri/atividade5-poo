const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClienteMenorConsumo = sequelize.define(
    'ClienteMenorConsumo',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        valorConsumido: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
            allowNull: false,
        },
    },
    {
        tableName: 'clientes_menor_consumo',
        timestamps: false,
    }
);

module.exports = ClienteMenorConsumo;
