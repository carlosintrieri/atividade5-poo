import React, { useState, useEffect } from 'react';
import { getProdutosServicosConsumo, createProdutoServicoConsumo, updateProdutoServicoConsumo, deleteProdutoServicoConsumo } from '../api';

const ProdutosServicosComponent = () => {
    const [produtosServicos, setProdutosServicos] = useState([]);

    useEffect(() => {
        fetchProdutosServicos();
    }, []);

    const fetchProdutosServicos = async () => {
        const response = await getProdutosServicosConsumo();
        setProdutosServicos(response.data);
    };

    const handleCreate = async (novoProdutoServico) => {
        await createProdutoServicoConsumo(novoProdutoServico);
        fetchProdutosServicos();
    };

    const handleUpdate = async (id, produtoServicoAtualizado) => {
        await updateProdutoServicoConsumo(id, produtoServicoAtualizado);
        fetchProdutosServicos();
    };

    const handleDelete = async (id) => {
        await deleteProdutoServicoConsumo(id);
        fetchProdutosServicos();
    };

    return (
        <div>
            <h2>Produtos e Serviços</h2>
            {/* Adicione aqui a lógica de renderização da tabela e formulários */}
        </div>
    );
};

export default ProdutosServicosComponent;
