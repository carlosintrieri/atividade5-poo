const { Op } = require('sequelize');
const ClienteMenorConsumo = require('../models/ClienteMenorConsumo');

class ClienteMenorConsumoController {
    async listar(req, res) {
        try {
            const clientes = await ClienteMenorConsumo.findAll({
                where: { valorConsumido: { [Op.gt]: 0 } },
                order: [['valorConsumido', 'ASC']],
                limit: 10,
            });
            res.json(clientes);
        } catch (error) {
            console.error('Erro ao listar:', error);
            res.status(500).json({ erro: 'Erro ao listar clientes com menor consumo.' });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, cpf, telefone, valorConsumido } = req.body;

            if (!nome || !cpf || valorConsumido === undefined) {
                return res.status(400).json({ erro: 'Nome, CPF e valor consumido são obrigatórios.' });
            }

            if (typeof valorConsumido !== 'number' || valorConsumido < 0) {
                return res.status(400).json({ erro: 'Valor consumido deve ser um número não negativo.' });
            }

            const novoCliente = await ClienteMenorConsumo.create({ nome, cpf, telefone, valorConsumido });
            res.status(201).json(novoCliente);
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ erro: 'CPF já está cadastrado.' });
            }
            res.status(500).json({ erro: 'Erro ao cadastrar cliente.' });
        }
    }

    async buscarPorId(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ erro: 'ID inválido.' });
            }

            const cliente = await ClienteMenorConsumo.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ erro: 'Cliente não encontrado.' });
            }

            res.json(cliente);
        } catch (error) {
            console.error('Erro ao buscar por ID:', error);
            res.status(500).json({ erro: 'Erro ao buscar cliente.' });
        }
    }

    async atualizar(req, res) {
        try {
            const id = Number(req.params.id);
            const { nome, cpf, telefone, valorConsumido } = req.body;

            const clienteExistente = await ClienteMenorConsumo.findByPk(id);
            if (!clienteExistente) {
                return res.status(404).json({ erro: 'Cliente não encontrado.' });
            }

            await clienteExistente.update({ nome, cpf, telefone, valorConsumido });
            res.json(clienteExistente);
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
        }
    }

    async deletar(req, res) {
        try {
            const id = Number(req.params.id);
            const cliente = await ClienteMenorConsumo.findByPk(id);

            if (!cliente) {
                return res.status(404).json({ erro: 'Cliente não encontrado.' });
            }

            await cliente.destroy();
            res.json({ mensagem: 'Cliente removido com sucesso.', id });
        } catch (error) {
            console.error('Erro ao deletar:', error);
            res.status(500).json({ erro: 'Erro ao deletar cliente.' });
        }
    }
}

module.exports = new ClienteMenorConsumoController();
