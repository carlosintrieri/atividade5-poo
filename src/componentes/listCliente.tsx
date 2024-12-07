import React, { useState, useEffect } from "react";
import CSS from "csstype";
import "materialize-css/dist/css/materialize.min.css";

type Cliente = {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  dataEmissao: string;
  telefone: string;
  dataCadastro: string;
  genero: string;
  dataNascimento: string;
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

const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>(JSON.parse(localStorage.getItem("clientes") || "[]"));
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editNome, setEditNome] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [editRg, setEditRg] = useState("");
  const [editDataEmissao, setEditDataEmissao] = useState("");
  const [editTelefone, setEditTelefone] = useState("");
  const [editDataCadastro, setEditDataCadastro] = useState("");
  const [editGenero, setEditGenero] = useState("");
  const [editDataNascimento, setEditDataNascimento] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const storedClientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    setClientes(storedClientes);
  }, []);

  const handleEdit = (index: number) => {
    setIsEditing(true);
    const cliente = clientes[index];
    setEditIndex(index);
    setEditNome(cliente.nome);
    setEditCpf(cliente.cpf);
    setEditRg(cliente.rg);
    setEditDataEmissao(cliente.dataEmissao);
    setEditTelefone(cliente.telefone);
    setEditDataCadastro(cliente.dataCadastro);
    setEditGenero(cliente.genero);
    setEditDataNascimento(cliente.dataNascimento);
  };

  const handleUpdate = () => {
    const updatedClientes = [...clientes];
    updatedClientes[editIndex] = {
      id: updatedClientes[editIndex].id,
      nome: editNome,
      cpf: editCpf,
      rg: editRg,
      dataEmissao: editDataEmissao,
      telefone: editTelefone,
      dataCadastro: editDataCadastro,
      genero: editGenero,
      dataNascimento: editDataNascimento,
    };

    localStorage.setItem("clientes", JSON.stringify(updatedClientes));
    setClientes(updatedClientes);
    setIsEditing(false);
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditIndex(-1);
  };

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este cliente?");

    if (confirmDelete) {
      const updatedClientes = clientes.filter((_, i) => i !== index);
      localStorage.setItem("clientes", JSON.stringify(updatedClientes));
      setClientes(updatedClientes);

      // Exibe a mensagem de sucesso
      setSuccessMessage("Cliente excluído com sucesso!");

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

      {/* Lista de Clientes */}
      <div className="container" style={{ marginLeft: "220px", width: "calc(100% - 220px)" }}>
        <h5 className="center-align">Lista de Clientes</h5>

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
              <th>CPF</th>
              <th>RG</th>
              <th>Telefone</th>
              <th>Data de Emissão</th>
              <th>Data de Cadastro</th>
              <th>Gênero</th>
              <th>Data de Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.rg}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.dataEmissao}</td>
                  <td>{cliente.dataCadastro}</td>
                  <td>{cliente.genero}</td>
                  <td>{cliente.dataNascimento}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} style={actionButtonStyle}>Editar</button>
                    <button onClick={() => handleDelete(index)} style={actionButtonStyle}>Deletar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>Nenhum cliente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Formulário de Edição */}
        {isEditing && (
          <div style={{ marginTop: "20px" }}>
            <h5>Editar Cliente</h5>
            <div>
              <label>Nome:</label>
              <input type="text" value={editNome} onChange={(e) => setEditNome(e.target.value)} />
            </div>
            <div>
              <label>CPF:</label>
              <input type="text" value={editCpf} onChange={(e) => setEditCpf(e.target.value)} />
            </div>
            <div>
              <label>RG:</label>
              <input type="text" value={editRg} onChange={(e) => setEditRg(e.target.value)} />
            </div>
            <div>
              <label>Data de Emissão:</label>
              <input type="date" value={editDataEmissao} onChange={(e) => setEditDataEmissao(e.target.value)} />
            </div>
            <div>
              <label>Telefone:</label>
              <input type="text" value={editTelefone} onChange={(e) => setEditTelefone(e.target.value)} />
            </div>
            <div>
              <label>Data de Cadastro:</label>
              <input type="date" value={editDataCadastro} onChange={(e) => setEditDataCadastro(e.target.value)} />
            </div>
            <div>
              <label>Gênero:</label>
              <input type="text" value={editGenero} onChange={(e) => setEditGenero(e.target.value)} />
            </div>
            <div>
              <label>Data de Nascimento:</label>
              <input type="date" value={editDataNascimento} onChange={(e) => setEditDataNascimento(e.target.value)} />
            </div>
            <button onClick={handleUpdate} style={actionButtonStyle}>Salvar</button>
            <button onClick={handleCancel} style={cancelButtonStyle}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaClientes;
