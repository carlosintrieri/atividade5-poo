const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho de acordo com a sua estrutura

const Cliente = sequelize.define('Cliente', {
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
}, {
    tableName: 'clientes', // Nome da tabela no banco
    timestamps: false,
});

module.exports = Cliente;
