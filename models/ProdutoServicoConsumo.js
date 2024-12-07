const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProdutoServicoConsumo = sequelize.define(
    'ProdutoServicoConsumo',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'produtos_servicos_consumo',
        timestamps: false,
    }
);

module.exports = ProdutoServicoConsumo;
