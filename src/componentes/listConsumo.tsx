import React, { useState, useEffect } from "react";
import CSS from "csstype";

const containerStyle: CSS.Properties = {
  display: "flex",
};

const navStyle: CSS.Properties = {
  width: "200px", // Largura do menu
  backgroundColor: "#000000",
  padding: "10px",
  height: "100vh", // Altura para preencher a tela
  display: "flex",
  flexDirection: "column", // Organizar itens na vertical
  justifyContent: "flex-start", // Alinhar ao topo
  position: "fixed", // Tornar o menu fixo
  top: "0", // Fica no topo da página
  left: "0", // Alinha à esquerda
  bottom: "0", // Faz o menu ocupar toda a altura da tela
};

const logoStyle: CSS.Properties = {
  fontSize: "large",
  fontFamily: "Arial, sans-serif",
  color: "#FFFFFF",
  marginBottom: "20px", // Espaço abaixo da logo
  textAlign: "center",
};

const menuLinksStyle: CSS.Properties = {
  display: "flex",
  flexDirection: "column", // Itens do menu em coluna
  gap: "10px",
};

const botaoStyle: CSS.Properties = {
  padding: "8px 16px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#333333",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "5px",
  textAlign: "center",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  textDecoration: "none",
};

const actionButtonStyle: CSS.Properties = {
  backgroundColor: "#000000",
  color: "#FFFFFF",
  padding: "8px 16px",
  border: "none",
  cursor: "pointer",
  marginLeft: "10px",
};

type Consumo = {
  idPedido: string;
  idProduto: string;
  nomeProduto: string;
  valor: string;
};

const ListaConsumo: React.FC = () => {
  const [consumos, setConsumos] = useState<Consumo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Consumo>({
    idPedido: "",
    idProduto: "",
    nomeProduto: "",
    valor: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const consumosArmazenados = JSON.parse(localStorage.getItem("consumos") || "[]");
    setConsumos(consumosArmazenados);
  }, []);

  const handleEdit = (index: number) => {
    const consumo = consumos[index];
    setEditIndex(index);
    setFormData({
      idPedido: consumo.idPedido,
      idProduto: consumo.idProduto,
      nomeProduto: consumo.nomeProduto,
      valor: consumo.valor,
    });
  };

  const handleUpdate = () => {
    const updatedConsumos = [...consumos];
    updatedConsumos[editIndex!] = formData;

    localStorage.setItem("consumos", JSON.stringify(updatedConsumos));
    setConsumos(updatedConsumos);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este item?");

    if (confirmDelete) {
      const updatedConsumos = consumos.filter((_, i) => i !== index);
      localStorage.setItem("consumos", JSON.stringify(updatedConsumos));
      setConsumos(updatedConsumos);

      setSuccessMessage("Consumo excluído com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Menu de Navegação à Esquerda */}
      <nav style={navStyle}>
        <div style={logoStyle}>World Beauty</div>
        <div style={menuLinksStyle}>
          <a style={botaoStyle} href="/cadServico">Cadastros</a>
          <a style={botaoStyle} href="/listaCliente">Cliente</a>
          <a style={botaoStyle} href="/listaProduto">Produto</a>
          <a style={botaoStyle} href="/listaPedidos">Consumo</a>
          <a style={botaoStyle} href="/listaServicos">Serviços</a>
          <a style={botaoStyle} href="/Listagens">Listagens</a>
        </div>
      </nav>

      {/* Lista de Consumo */}
      <div className="container" style={{ marginLeft: "220px", width: "calc(100% - 220px)" }}>
        <h5 className="center-align">Lista de Consumo</h5>

        {/* Mensagem de sucesso */}
        {successMessage && (
          <div style={{ marginBottom: "20px", color: "green", textAlign: "center" }}>
            {successMessage}
          </div>
        )}

        <table className="striped centered">
          <thead>
            <tr>
              <th>Nome do Produto</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consumos.length > 0 ? (
              consumos.map((consumo, index) => (
                <tr key={index}>
                  <td>{consumo.nomeProduto}</td>
                  <td>{consumo.valor}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} style={actionButtonStyle}>Editar</button>
                    <button onClick={() => handleDelete(index)} style={actionButtonStyle}>Deletar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>Nenhum item encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Formulário de Edição */}
        {editIndex !== null && (
          <div style={{ marginTop: "20px" }}>
            <h5>Editar Consumo</h5>
            <div>
              <label>Nome do Produto:</label>
              <input
                type="text"
                value={formData.nomeProduto}
                onChange={(e) => setFormData({ ...formData, nomeProduto: e.target.value })}
              />
            </div>
            <div>
              <label>Valor:</label>
              <input
                type="text"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              />
            </div>
            <button onClick={handleUpdate} style={actionButtonStyle}>Salvar</button>
            <button onClick={handleCancel} style={{ ...actionButtonStyle, backgroundColor: "red" }}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaConsumo;
