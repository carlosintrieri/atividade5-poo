const sequelize = require('../database/index');
const ClienteMenorConsumo = require('../models/ClienteMenorConsumo');
const ClienteQtd = require('../models/ClienteQtd');
const ClienteValor = require('../models/ClienteValor');
const ConsumoGenero = require('../models/ConsumoGenero');
const ProdutoServicoConsumo = require('../models/ProdutoServicoConsumo');

(async () => {
    try {
        await sequelize.sync({ force: false }); // Altere para "force: true" para sobrescrever tabelas
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    } finally {
        sequelize.close();
    }
})();
