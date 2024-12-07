import React from "react";
import { useLocation } from "react-router-dom";

const Cliente = () => {
  const location = useLocation();
  const { cliente }: any = location.state || {}; // Recebe o cliente selecionado

  if (!cliente) {
    return <div>Cliente não encontrado.</div>;
  }

  return (
    <div className="container">
      <h5>Detalhes do Cliente</h5>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>CPF:</strong> {cliente.cpf}</p>
      <p><strong>RG:</strong> {cliente.rg}</p>
      <p><strong>Data de Emissão:</strong> {cliente.dataEmissao}</p>
      <p><strong>Telefone:</strong> {cliente.telefone}</p>
      <p><strong>Data de Cadastro:</strong> {cliente.dataCadastro}</p>
    </div>
  );
};

export default Cliente;
