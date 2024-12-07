const Sequelize = require('sequelize');

// Configuração do Sequelize com timestamps desativados globalmente
const sequelize = new Sequelize('mvc_ecommerce', 'root', 'Carlos1313*', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    timezone: '-03:00',
    define: {
        timestamps: false // Desativa timestamps (createdAt e updatedAt) para todos os modelos
    }
});

// Sincronizar automaticamente os modelos com o banco de dados
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Sincronização com o banco de dados foi bem-sucedida!');
    })
    .catch(err => {
        console.error('Erro ao sincronizar com o banco de dados:', err);
    });

// Testa a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

// Exportando a instância do Sequelize para ser usada em outros arquivos
module.exports = sequelize;
