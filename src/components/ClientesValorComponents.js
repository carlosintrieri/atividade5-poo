import React, { useState, useEffect } from 'react';
import { getClientesValor, createClienteValor, updateClienteValor, deleteClienteValor } from '../api';

const ClientesValorComponent = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await getClientesValor();
        setClientes(response.data);
    };

    const handleCreate = async (novoCliente) => {
        await createClienteValor(novoCliente);
        fetchClientes();
    };

    const handleUpdate = async (id, clienteAtualizado) => {
        await updateClienteValor(id, clienteAtualizado);
        fetchClientes();
    };

    const handleDelete = async (id) => {
        await deleteClienteValor(id);
        fetchClientes();
    };

    return (
        <div>
            <h2>Clientes por Valor Consumido</h2>
            {/* Adicione aqui a lógica de renderização da tabela e formulários */}
        </div>
    );
};

export default ClientesValorComponent;
