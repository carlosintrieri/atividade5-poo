import React, { useState, useEffect } from 'react';
import { getClientesQtd, createClienteQtd, updateClienteQtd, deleteClienteQtd } from '../api';

const ClientesQtdComponent = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await getClientesQtd();
        setClientes(response.data);
    };

    const handleCreate = async (novoCliente) => {
        await createClienteQtd(novoCliente);
        fetchClientes();
    };

    const handleUpdate = async (id, clienteAtualizado) => {
        await updateClienteQtd(id, clienteAtualizado);
        fetchClientes();
    };

    const handleDelete = async (id) => {
        await deleteClienteQtd(id);
        fetchClientes();
    };

    return (
        <div>
            <h2>Clientes por Quantidade Consumida</h2>
            {/* Adicione aqui a lógica de renderização da tabela e formulários */}
        </div>
    );
};

export default ClientesQtdComponent;
