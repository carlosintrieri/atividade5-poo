const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ConsumoGenero = sequelize.define(
    'ConsumoGenero',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clienteNome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        produtoServicoNome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valorTotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        genero: {
            type: DataTypes.ENUM('MASCULINO', 'FEMININO'),
            allowNull: false,
        },
    },
    {
        tableName: 'consumo_genero',
        timestamps: false,
    }
);

module.exports = ConsumoGenero;
