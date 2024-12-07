import React, { useState } from "react";
import CSS from "csstype";

const backgroundColor: CSS.Properties = {
  backgroundColor: "#000000",
};

const botaoStyle: CSS.Properties = {
  padding: "12px 20px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#333333",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const fontStyle: CSS.Properties = {
  fontSize: "xx-large",
  fontFamily: "Arial, sans-serif",
  color: "#FFFFFF",
};

const actionButtonStyle: CSS.Properties = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

const CadastroConsumo: React.FC = () => {
  const [newIdPedido, setNewIdPedido] = useState("");
  const [newIdProduto, setNewIdProduto] = useState("");
  const [newNomeProduto, setNewNomeProduto] = useState("");
  const [newValor, setNewValor] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleAddConsumo = () => {
    const novoConsumo = {
      idPedido: newIdPedido,
      idProduto: newIdProduto,
      nomeProduto: newNomeProduto,
      valor: newValor,
    };

    const consumosExistentes = JSON.parse(localStorage.getItem("consumos") || "[]");
    consumosExistentes.push(novoConsumo);
    localStorage.setItem("consumos", JSON.stringify(consumosExistentes));

    setNewIdPedido("");
    setNewIdProduto("");
    setNewNomeProduto("");
    setNewValor("");

    setSuccessMessage("Consumo registrado com sucesso!");

    // Limpa a mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div>
      <nav>
        <div style={backgroundColor} className="nav-wrapper">
          <a className="brand-logo center" style={fontStyle}>
            World Beauty
          </a>
          <a style={botaoStyle} href="/cadServico">Cadastros</a>
          <a style={botaoStyle} href="/listaCliente">Cliente</a>
          <a style={botaoStyle} href="/listaProduto">Produto</a>
          <a style={botaoStyle} href="/listaPedidos">Consumo</a>
          <a style={botaoStyle} href="/listaServicos">Serviços</a>
          <a style={botaoStyle} href="/Listagens">Listagens</a>
        </div>
      </nav>
      <br />
      <div className="container">
        <h5 className="center-align">Cadastrar Novo Consumo</h5>

        {/* Mensagem de sucesso */}
        {successMessage && (
          <div style={{ marginBottom: "20px", color: "green", textAlign: "center" }}>
            {successMessage}
          </div>
        )}

        <input
          type="text"
          value={newIdPedido}
          onChange={(e) => setNewIdPedido(e.target.value)}
          placeholder="ID do Pedido"
        />
        <input
          type="text"
          value={newIdProduto}
          onChange={(e) => setNewIdProduto(e.target.value)}
          placeholder="ID do Produto"
        />
        <input
          type="text"
          value={newNomeProduto}
          onChange={(e) => setNewNomeProduto(e.target.value)}
          placeholder="Nome do Produto"
        />
        <input
          type="text"
          value={newValor}
          onChange={(e) => setNewValor(e.target.value)}
          placeholder="Valor"
        />
        <button onClick={handleAddConsumo} style={actionButtonStyle}>
          Registrar Consumo
        </button>
      </div>
    </div>
  );
};

export default CadastroConsumo;
