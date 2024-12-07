const Cliente = require('../models/ClienteValor');

class ClienteController {
    async listar(req, res) {
        try {
            const clientes = await Cliente.findAll({
                order: [['nome', 'asc']]
            });
            res.json(clientes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao listar clientes: ' + error.message });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, cpf, telefone, valorConsumido } = req.body;

            // Validação dos dados
            if (!nome || !cpf) {
                return res.status(400).json({ erro: 'Nome e CPF são obrigatórios.' });
            }

            // Verificar se o cliente já existe
            const clienteExistente = await Cliente.findOne({
                where: { cpf } // Verifica se o cliente com o mesmo CPF já existe
            });

            if (clienteExistente) {
                return res.status(400).json({ erro: 'Cliente já cadastrado com este CPF.' });
            }

            // Criar novo cliente
            const novoCliente = await Cliente.create({ nome, cpf, telefone, valorConsumido });

            res.status(201).json(novoCliente);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao cadastrar cliente: ' + error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const cliente = await Cliente.findByPk(id);

            if (!cliente) {
                return res.status(404).json({ erro: 'Cliente não encontrado' });
            }

            res.json(cliente);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao buscar cliente: ' + error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, cpf, telefone, valorConsumido } = req.body;

            // Verificar se o cliente existe
            const clienteExistente = await Cliente.findByPk(id);

            if (!clienteExistente) {
                return res.status(404).json({ erro: 'Cliente não encontrado' });
            }

            // Atualizar dados do cliente
            const clienteAtualizado = await clienteExistente.update({ nome, cpf, telefone, valorConsumido });

            res.json(clienteAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao atualizar cliente: ' + error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const clienteExistente = await Cliente.findByPk(id);

            if (!clienteExistente) {
                return res.status(404).json({ erro: 'Cliente não encontrado' });
            }

            await clienteExistente.destroy();

            res.json({ mensagem: 'Cliente removido com sucesso', id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao deletar cliente: ' + error.message });
        }
    }
}

module.exports = new ClienteController();

