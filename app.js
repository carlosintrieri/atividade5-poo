const express = require('express');
const cors = require('cors');
const routes = require('./routes');  // Verifique se o caminho está correto

const app = express();

// Configuração de middlewares
app.use(cors());  // Permite requisições de diferentes origens
app.use(express.json());  // Para lidar com o corpo das requisições em formato JSON
app.use(express.urlencoded({ extended: true }));  // Para lidar com dados de formulário codificados na URL

// Definindo as rotas com o prefixo '/api'
app.use('/api', routes);  // As rotas começam com /api, como /api/clientes-menor-consumo

// Rota de teste para verificar se o servidor está funcionando
app.get('/test', (req, res) => {
    res.json({ message: 'Servidor funcionando!' });
});

// Iniciando o servidor na porta especificada ou na porta 3001
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;  // Exportando o app para testes, se necessário
