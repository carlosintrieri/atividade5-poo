import React, { useState, useEffect } from "react";
import CSS from "csstype";
import "materialize-css/dist/css/materialize.min.css";

type Produto = {
  nomeProduto: string;
  preco: string;
  quantidade: string;
};

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

const cancelButtonStyle: CSS.Properties = {
  backgroundColor: "red", // Cor vermelha para o botão cancelar
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  cursor: "pointer",
  marginLeft: "10px",
};

const ListaProduto = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editNome, setEditNome] = useState<string>('');
  const [editPreco, setEditPreco] = useState<string>('');
  const [editQuantidade, setEditQuantidade] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const storedProdutos = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(storedProdutos);
  }, []);

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este produto?");
    if (confirmDelete) {
      const updatedProdutos = produtos.filter((_, i) => i !== index);
      localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
      setProdutos(updatedProdutos);

      // Exibe a mensagem de sucesso
      setSuccessMessage("Produto excluído com sucesso!");

      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    const produto = produtos[index];
    setEditIndex(index);
    setEditNome(produto.nomeProduto);
    setEditPreco(produto.preco);
    setEditQuantidade(produto.quantidade);
  };

  const handleUpdate = () => {
    const updatedProdutos = [...produtos];
    updatedProdutos[editIndex] = {
      nomeProduto: editNome,
      preco: editPreco,
      quantidade: editQuantidade,
    };

    localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
    setProdutos(updatedProdutos);
    setIsEditing(false);
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditIndex(-1);
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

      {/* Lista de Produtos */}
      <div className="container" style={{ marginLeft: "220px", width: "calc(100% - 220px)" }}>
        <h5 className="center-align">Lista de Produtos</h5>

        {/* Mensagem de sucesso */}
        {successMessage && (
          <div style={{ marginBottom: "20px", color: "green", textAlign: "center" }}>
            {successMessage}
          </div>
        )}

        <table className="striped centered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nomeProduto}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.quantidade}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} style={actionButtonStyle}>Editar</button>
                    <button onClick={() => handleDelete(index)} style={actionButtonStyle}>Deletar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>Nenhum produto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Formulário de Edição */}
        {isEditing && (
          <div style={{ marginTop: "20px" }}>
            <h5>Editar Produto</h5>
            <div>
              <label>Nome:</label>
              <input type="text" value={editNome} onChange={(e) => setEditNome(e.target.value)} />
            </div>
            <div>
              <label>Preço:</label>
              <input type="text" value={editPreco} onChange={(e) => setEditPreco(e.target.value)} />
            </div>
            <div>
              <label>Quantidade:</label>
              <input type="text" value={editQuantidade} onChange={(e) => setEditQuantidade(e.target.value)} />
            </div>
            <button onClick={handleUpdate} style={actionButtonStyle}>Salvar</button>
            <button onClick={handleCancel} style={cancelButtonStyle}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaProduto;
