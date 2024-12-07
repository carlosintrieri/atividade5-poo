import React, { useState, useEffect } from "react";
import CSS from "csstype";
import "materialize-css/dist/css/materialize.min.css";

type Servico = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  dataCadastro: string;
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

const ListaServicos: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>(JSON.parse(localStorage.getItem("servicos") || "[]"));
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editNome, setEditNome] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [editPreco, setEditPreco] = useState("");
  const [editDataCadastro, setEditDataCadastro] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const storedServicos = JSON.parse(localStorage.getItem("servicos") || "[]");
    setServicos(storedServicos);
  }, []);

  const handleEdit = (index: number) => {
    setIsEditing(true);
    const servico = servicos[index];
    setEditIndex(index);
    setEditNome(servico.nome);
    setEditDescricao(servico.descricao);
    setEditPreco(servico.preco);
    setEditDataCadastro(servico.dataCadastro);
  };

  const handleUpdate = () => {
    const updatedServicos = [...servicos];
    updatedServicos[editIndex] = {
      id: updatedServicos[editIndex].id,
      nome: editNome,
      descricao: editDescricao,
      preco: editPreco,
      dataCadastro: editDataCadastro,
    };

    localStorage.setItem("servicos", JSON.stringify(updatedServicos));
    setServicos(updatedServicos);
    setIsEditing(false);
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditIndex(-1);
  };

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este serviço?");

    if (confirmDelete) {
      const updatedServicos = servicos.filter((_, i) => i !== index);
      localStorage.setItem("servicos", JSON.stringify(updatedServicos));
      setServicos(updatedServicos);

      // Exibe a mensagem de sucesso
      setSuccessMessage("Serviço excluído com sucesso!");

      // Limpa a mensagem após 3 segundos
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

      {/* Lista de Serviços */}
      <div className="container" style={{ marginLeft: "220px", width: "calc(100% - 220px)" }}>
        <h5 className="center-align">Lista de Serviços</h5>

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
              <th>Descrição</th>
              <th>Preço</th>
              <th>Data de Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.length > 0 ? (
              servicos.map((servico, index) => (
                <tr key={index}>
                  <td>{servico.nome}</td>
                  <td>{servico.descricao}</td>
                  <td>{servico.preco}</td>
                  <td>{servico.dataCadastro}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} style={actionButtonStyle}>Editar</button>
                    <button onClick={() => handleDelete(index)} style={actionButtonStyle}>Deletar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>Nenhum serviço encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Formulário de Edição */}
        {isEditing && (
          <div style={{ marginTop: "20px" }}>
            <h5>Editar Serviço</h5>
            <div>
              <label>Nome:</label>
              <input type="text" value={editNome} onChange={(e) => setEditNome(e.target.value)} />
            </div>
            <div>
              <label>Descrição:</label>
              <input type="text" value={editDescricao} onChange={(e) => setEditDescricao(e.target.value)} />
            </div>
            <div>
              <label>Preço:</label>
              <input type="text" value={editPreco} onChange={(e) => setEditPreco(e.target.value)} />
            </div>
            <div>
              <label>Data de Cadastro:</label>
              <input type="date" value={editDataCadastro} onChange={(e) => setEditDataCadastro(e.target.value)} />
            </div>
            <button onClick={handleUpdate} style={actionButtonStyle}>Salvar</button>
            <button onClick={handleCancel} style={cancelButtonStyle}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaServicos;
