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

const FormularioCadastroServico: React.FC = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(""); // Campo de preço
  const [dataCadastro, setDataCadastro] = useState(
    new Date().toISOString().split("T")[0] // Define a data atual no formato YYYY-MM-DD
  );
  const [flashMessage, setFlashMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nome") {
      setNome(value);
    } else if (name === "descricao") {
      setDescricao(value);
    } else if (name === "preco") {
      setPreco(value); // Atualiza o preço
    } else if (name === "dataCadastro") {
      setDataCadastro(value); // Atualiza a data de cadastro
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoServico = {
      nome,
      descricao,
      preco, // Preço
      dataCadastro, // Data de cadastro que foi preenchida
    };
    const servicosSalvos = JSON.parse(localStorage.getItem("servicos") || "[]");

    servicosSalvos.push(novoServico);
    localStorage.setItem("servicos", JSON.stringify(servicosSalvos));

    // Exibe a mensagem de sucesso
    setFlashMessage("Serviço registrado com sucesso!");

    // Limpa os campos de entrada
    setNome("");
    setDescricao("");
    setPreco(""); // Limpa o campo preço
    setDataCadastro(new Date().toISOString().split("T")[0]); // Limpa o campo de data de cadastro com a data atual

    // Limpa a mensagem após 3 segundos
    setTimeout(() => {
      setFlashMessage("");
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
        <h5 className="center-align">Cadastrar Novo Serviço</h5>

        {/* Mensagem de sucesso */}
        {flashMessage && (
          <div style={{ marginBottom: "20px", color: "green", textAlign: "center" }}>
            {flashMessage}
          </div>
        )}

        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="nome_servico"
                  type="text"
                  name="nome"
                  value={nome}
                  onChange={handleChange}
                  className="validate"
                />
                <label htmlFor="nome_servico">Nome do Serviço</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="descricao_servico"
                  type="text"
                  name="descricao"
                  value={descricao}
                  onChange={handleChange}
                  className="validate"
                />
                <label htmlFor="descricao_servico">Descrição do Serviço</label>
              </div>
              {/* Campo de Preço */}
              <div className="input-field col s6">
                <input
                  id="preco_servico"
                  type="text"
                  name="preco"
                  value={preco}
                  onChange={handleChange}
                  className="validate"
                />
                <label htmlFor="preco_servico">Preço do Serviço</label>
              </div>
              {/* Campo de Data de Cadastro */}
              <div className="input-field col s6">
                <input
                  id="data_cadastro_servico"
                  type="date" // Alterado para 'date' em vez de 'text'
                  name="dataCadastro"
                  value={dataCadastro}
                  onChange={handleChange}
                  className="validate"
                />
                <label htmlFor="data_cadastro_servico">Data de Cadastro</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button style={botaoStyle} type="submit">
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioCadastroServico;
