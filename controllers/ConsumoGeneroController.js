const { ConsumoGenero } = require('../models/ConsumoGenero'); // Importando o modelo ConsumoGenero

class ConsumoGeneroController {
    async listar(req, res) {
        try {
            const consumoFeminino = await ConsumoGenero.findAll({
                where: { genero: 'FEMININO' },
                order: [['valorTotal', 'DESC']],
                limit: 10
            });

            const consumoMasculino = await ConsumoGenero.findAll({
                where: { genero: 'MASCULINO' },
                order: [['valorTotal', 'DESC']],
                limit: 10
            });

            res.json({ feminino: consumoFeminino, masculino: consumoMasculino });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao listar consumos por gênero: ' + error.message });
        }
    }

    async cadastrar(req, res) {
        try {
            const { clienteNome, produtoServicoNome, valorTotal, genero } = req.body;

            if (!clienteNome || !produtoServicoNome || valorTotal === undefined || !genero) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
            }

            if (!['MASCULINO', 'FEMININO'].includes(genero)) {
                return res.status(400).json({ erro: 'Gênero inválido. Deve ser "MASCULINO" ou "FEMININO".' });
            }

            const novoConsumo = await ConsumoGenero.create({
                clienteNome,
                produtoServicoNome,
                valorTotal,
                genero
            });

            res.status(201).json(novoConsumo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao cadastrar consumo: ' + error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const consumo = await ConsumoGenero.findByPk(id); // Usando `findByPk` para buscar pelo ID

            if (!consumo) {
                return res.status(404).json({ erro: 'Consumo não encontrado' });
            }

            res.json(consumo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao buscar consumo: ' + error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { clienteNome, produtoServicoNome, valorTotal, genero } = req.body;

            if (genero && !['MASCULINO', 'FEMININO'].includes(genero)) {
                return res.status(400).json({ erro: 'Gênero inválido. Deve ser "MASCULINO" ou "FEMININO".' });
            }

            const consumoExistente = await ConsumoGenero.findByPk(id);

            if (!consumoExistente) {
                return res.status(404).json({ erro: 'Consumo não encontrado' });
            }

            const consumoAtualizado = await consumoExistente.update({
                clienteNome,
                produtoServicoNome,
                valorTotal,
                genero
            });

            res.json(consumoAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao atualizar consumo: ' + error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const consumoExistente = await ConsumoGenero.findByPk(id);

            if (!consumoExistente) {
                return res.status(404).json({ erro: 'Consumo não encontrado' });
            }

            await consumoExistente.destroy();
            res.json({ mensagem: 'Consumo removido com sucesso', id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao deletar consumo: ' + error.message });
        }
    }
}

module.exports = new ConsumoGeneroController();
