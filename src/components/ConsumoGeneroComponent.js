import React, { useState, useEffect } from 'react';
import { getConsumosGenero, createConsumoGenero, updateConsumoGenero, deleteConsumoGenero } from '../api';

const ConsumoGeneroComponent = () => {
    const [consumos, setConsumos] = useState({ feminino: [], masculino: [] });

    useEffect(() => {
        fetchConsumos();
    }, []);

    const fetchConsumos = async () => {
        const response = await getConsumosGenero();
        setConsumos(response.data);
    };

    const handleCreate = async (novoConsumo) => {
        await createConsumoGenero(novoConsumo);
        fetchConsumos();
    };

    const handleUpdate = async (id, consumoAtualizado) => {
        await updateConsumoGenero(id, consumoAtualizado);
        fetchConsumos();
    };

    const handleDelete = async (id) => {
        await deleteConsumoGenero(id);
        fetchConsumos();
    };

    return (
        <div>
            <h2>Consumo por Gênero</h2>
            {/* Adicione aqui a lógica de renderização das tabelas e formulários */}
        </div>
    );
};

export default ConsumoGeneroComponent;
