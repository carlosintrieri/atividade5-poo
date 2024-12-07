const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClienteQtd = sequelize.define(
    'ClienteQtd',
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
        qtdConsumida: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        tableName: 'clientes_qtd',
        timestamps: false,
    }
);

module.exports = ClienteQtd;
