// controllers/ProdutoServicoController.js

const { ProdutoServicoConsumo } = require('../models/ProdutoServicoConsumo');  // Corrija o caminho de acordo com sua estrutura de pastas

class ProdutoServicoController {
    // Listar todos os produtos/serviços
    async listar(req, res) {
        try {
            const produtos = await ProdutoServicoConsumo.findAll({
                order: [['valor', 'desc']],  // Ordenando pelo valor de forma decrescente
            });
            res.json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao listar produtos/serviços: ' + error.message });
        }
    }

    // Cadastrar novo produto/serviço
    async cadastrar(req, res) {
        try {
            const { nome, valor } = req.body;

            // Verificação para garantir que os dados essenciais foram fornecidos
            if (!nome || valor === undefined) {
                return res.status(400).json({ erro: 'Nome e valor são obrigatórios.' });
            }

            // Usando `findOrCreate` para evitar duplicação de nomes
            const [novoProdutoServico, criado] = await ProdutoServicoConsumo.findOrCreate({
                where: { nome },
                defaults: { nome, valor }
            });

            // Caso o produto/serviço já exista
            if (!criado) {
                return res.status(400).json({ erro: 'Já existe um produto/serviço com este nome.' });
            }

            res.status(201).json(novoProdutoServico);
        } catch (error) {
            console.error('Erro ao cadastrar produto/serviço:', error);
            res.status(500).json({ erro: 'Erro ao cadastrar produto/serviço: ' + error.message });
        }
    }

    // Buscar um produto/serviço por ID
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const produtoServico = await ProdutoServicoConsumo.findByPk(id);

            if (!produtoServico) {
                return res.status(404).json({ erro: 'Produto/serviço não encontrado' });
            }

            res.json(produtoServico);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao buscar produto/serviço: ' + error.message });
        }
    }

    // Atualizar um produto/serviço existente
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, valor } = req.body;

            if (!nome || valor === undefined) {
                return res.status(400).json({ erro: 'Nome e valor são obrigatórios.' });
            }

            const produtoServicoExistente = await ProdutoServicoConsumo.findByPk(id);

            if (!produtoServicoExistente) {
                return res.status(404).json({ erro: 'Produto/serviço não encontrado' });
            }

            const produtoServicoAtualizado = await produtoServicoExistente.update({
                nome,
                valor
            });

            res.json(produtoServicoAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao atualizar produto/serviço: ' + error.message });
        }
    }

    // Deletar um produto/serviço por ID
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const produtoServicoExistente = await ProdutoServicoConsumo.findByPk(id);

            if (!produtoServicoExistente) {
                return res.status(404).json({ erro: 'Produto/serviço não encontrado' });
            }

            await produtoServicoExistente.destroy();

            res.json({ mensagem: 'Produto/serviço removido com sucesso', id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao deletar produto/serviço: ' + error.message });
        }
    }
}

module.exports = new ProdutoServicoController();
