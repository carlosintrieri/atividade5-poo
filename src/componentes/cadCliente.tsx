import React, { useState } from "react";
import CSS from "csstype";

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
  marginRight: "5px",
};

const fontStyle: CSS.Properties = {
  fontSize: "xx-large",
  fontFamily: "Arial, sans-serif",
  color: "#FFFFFF",
};

const CadastroCliente = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [genero, setGenero] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "nome": setNome(value); break;
      case "cpf": setCpf(value); break;
      case "rg": setRg(value); break;
      case "dataEmissao": setDataEmissao(value); break;
      case "telefone": setTelefone(value); break;
      case "dataCadastro": setDataCadastro(value); break;
      case "genero": setGenero(value); break;
      case "dataNascimento": setDataNascimento(value); break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clienteNovo: Cliente = {
      id: String(Date.now()),
      nome,
      cpf,
      rg,
      dataEmissao,
      telefone,
      dataCadastro,
      genero,
      dataNascimento,
    };

    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    clientes.push(clienteNovo);
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Limpa os campos após o cadastro
    setNome("");
    setCpf("");
    setRg("");
    setDataEmissao("");
    setTelefone("");
    setDataCadastro("");
    setGenero("");
    setDataNascimento("");

    // Exibe a mensagem de sucesso
    setSuccessMessage("Cliente cadastrado com sucesso!");

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

      <div className="container">
        <h5 className="center-align">Cadastro de Cliente</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Nome:</label>
            <input type="text" name="nome" value={nome} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>CPF:</label>
            <input type="text" name="cpf" value={cpf} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>RG:</label>
            <input type="text" name="rg" value={rg} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Data Emissão:</label>
            <input type="text" name="dataEmissao" value={dataEmissao} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Telefone:</label>
            <input type="text" name="telefone" value={telefone} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Data Cadastro:</label>
            <input type="text" name="dataCadastro" value={dataCadastro} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Data de Nascimento:</label>
            <input type="text" name="dataNascimento" value={dataNascimento} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="genero" style={{ paddingLeft: "10px" }}>Gênero:</label>
            <div className="row" style={{ paddingLeft: "20px", marginLeft: "40px" }}>
              <div className="col s12">
                <label>
                  <input name="genero" type="radio" value="Masculino" checked={genero === "Masculino"} onChange={handleChange} />
                  <span>Masculino</span>
                </label>
              </div>
              <div className="col s12">
                <label>
                  <input name="genero" type="radio" value="Feminino" checked={genero === "Feminino"} onChange={handleChange} />
                  <span>Feminino</span>
                </label>
              </div>
              <div className="col s12">
                <label>
                  <input name="genero" type="radio" value="Outro" checked={genero === "Outro"} onChange={handleChange} />
                  <span>Outro</span>
                </label>
              </div>
            </div>
          </div>
          <button type="submit" style={botaoStyle}>Registrar Cliente</button>
        </form>

        {successMessage && (
          <div style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default CadastroCliente;
