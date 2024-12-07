import axios from 'axios';
const express = require('express');
const router = express.Router();

// Controllers
const ClienteValorController = require('../controllers/ClienteValorController');
const ClienteQtdController = require('../controllers/ClienteQtdController');
const ClienteMenorConsumoController = require('../controllers/ClienteMenorConsumoController');
const ProdutoServicoController = require('../controllers/ProdutoServicoController');
const ConsumoGeneroController = require('../controllers/ConsumoGeneroController');

// Função fetchData (usando Axios)
const fetchData = async (url, method = 'GET', data = null) => {
    try {
        const config = {
            method,
            url: `http://localhost:3000${url}`, // URL do backend
            data: data || {},  // Adiciona dados para POST ou PUT
        };

        const response = await axios(config);
        return response.data;  // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        throw error;  // Lança o erro para ser tratado
    }
};

// Rotas ClienteValor
router.get('/clientes-valor', async (req, res) => {
    try {
        const data = await fetchData('/clientes-valor');
        res.json(data);  // Retorna os dados para o cliente
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados', error });
    }
});
router.post('/clientes-valor', ClienteValorController.cadastrar);
router.put('/clientes-valor/:id', ClienteValorController.atualizar);
router.delete('/clientes-valor/:id', ClienteValorController.deletar);

// Rotas ClienteQtd
router.get('/clientes-qtd', ClienteQtdController.listar);
router.post('/clientes-qtd', ClienteQtdController.cadastrar);
router.put('/clientes-qtd/:id', ClienteQtdController.atualizar);
router.delete('/clientes-qtd/:id', ClienteQtdController.deletar);

// Rotas ClienteMenorConsumo
router.get('/clientes-menor-consumo', ClienteMenorConsumoController.listar);
router.post('/clientes-menor-consumo', ClienteMenorConsumoController.cadastrar);
router.put('/clientes-menor-consumo/:id', ClienteMenorConsumoController.atualizar);
router.delete('/clientes-menor-consumo/:id', ClienteMenorConsumoController.deletar);

// Rotas ProdutoServico
router.get('/produtos-servicos', ProdutoServicoController.listar);
router.post('/produtos-servicos', ProdutoServicoController.cadastrar);
router.put('/produtos-servicos/:id', ProdutoServicoController.atualizar);
router.delete('/produtos-servicos/:id', ProdutoServicoController.deletar);

// Rotas ConsumoGenero
router.get('/consumo-genero', ConsumoGeneroController.listar);
router.post('/consumo-genero', ConsumoGeneroController.cadastrar);
router.put('/consumo-genero/:id', ConsumoGeneroController.atualizar);
router.delete('/consumo-genero/:id', ConsumoGeneroController.deletar);

// Rota de teste
router.get('/test', (req, res) => {
    res.json({ message: 'Rota de teste funcionando!' });
});

// Middleware para logar todas as requisições
router.use((req, res, next) => {
    console.log(`Rota acessada: ${req.method} ${req.path}`);
    next();
});

module.exports = router;
