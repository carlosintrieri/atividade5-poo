import React, { useState, useEffect } from 'react';
import { getClientesMenorConsumo, createClienteMenorConsumo, updateClienteMenorConsumo, deleteClienteMenorConsumo } from '../api';

const ClientesMenorConsumoComponent = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await getClientesMenorConsumo();
        setClientes(response.data);
    };

    const handleCreate = async (novoCliente) => {
        await createClienteMenorConsumo(novoCliente);
        fetchClientes();
    };

    const handleUpdate = async (id, clienteAtualizado) => {
        await updateClienteMenorConsumo(id, clienteAtualizado);
        fetchClientes();
    };

    const handleDelete = async (id) => {
        await deleteClienteMenorConsumo(id);
        fetchClientes();
    };

    return (
        <div>
            <h2>Clientes com Menor Consumo</h2>
            {/* Adicione aqui a lógica de renderização da tabela e formulários */}
        </div>
    );
};

export default ClientesMenorConsumoComponent;
