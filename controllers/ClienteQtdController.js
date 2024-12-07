const { Op } = require('sequelize');
const ClienteQtd = require('../models/ClienteQtd');

class ClienteQtdController {
    async listar(req, res) {
        try {
            const clientes = await ClienteQtd.findAll({
                where: { qtdConsumida: { [Op.gt]: 0 } },
                order: [['qtdConsumida', 'DESC']],
            });
            res.json(clientes);
        } catch (error) {
            console.error('Erro ao listar:', error);
            res.status(500).json({ erro: 'Erro ao listar clientes.' });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, cpf, telefone, qtdConsumida } = req.body;

            if (!nome || !cpf || qtdConsumida === undefined) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
            }

            if (typeof qtdConsumida !== 'number' || qtdConsumida < 0) {
                return res.status(400).json({ erro: 'Quantidade consumida deve ser um número não negativo.' });
            }

            const cliente = await ClienteQtd.create({ nome, cpf, telefone, qtdConsumida });
            res.status(201).json(cliente);
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ erro: 'Erro ao cadastrar cliente.' });
        }
    }

    async buscarPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const cliente = await ClienteQtd.findByPk(id);

            if (!cliente) {
                return res.status(404).json({ erro: 'Cliente não encontrado.' });
            }

            res.json(cliente);
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            res.status(500).json({ erro: 'Erro ao buscar cliente.' });
        }
    }

    async atualizar(req, res) {
        try {
            const id = Number(req.params.id);
            const { nome, cpf, telefone, qtdConsumida } = req.body;

            const cliente = await ClienteQtd.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ erro: 'Cliente não encontrado.' });
            }

            await cliente.update({ nome, cpf, telefone, qtdConsumida });
            res.json(cliente);
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
        }
    }

    async deletar(req, res) {
        try {
            const id = Number(req.params.id);
            const cliente = await ClienteQtd.findByPk(id);

            if (!cliente) {
                return res.status(404).json({ erro: 'Cliente não encontrado.' });
            }

            await cliente.destroy();
            res.json({ mensagem: 'Cliente removido com sucesso.', id });
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            res.status(500).json({ erro: 'Erro ao deletar cliente.' });
        }
    }
}

module.exports = new ClienteQtdController();
