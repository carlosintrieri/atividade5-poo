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

const CadProduto: React.FC = () => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nomeProduto") {
      setNomeProduto(value);
    } else if (name === "preco") {
      setPreco(value);
    } else if (name === "quantidade") {
      setQuantidade(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = { nomeProduto, preco, quantidade };
    const storedProducts = JSON.parse(localStorage.getItem("produtos") || "[]");

    storedProducts.push(newProduct);
    localStorage.setItem("produtos", JSON.stringify(storedProducts));

    console.log("Produto registrado:", { nomeProduto, preco, quantidade });

    // Exibir a mensagem de sucesso
    setSuccessMessage("Produto registrado com sucesso!");

    // Limpar os campos do formulário
    setNomeProduto("");
    setPreco("");
    setQuantidade("");

    // Limpar a mensagem após 3 segundos
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
        <h5 className="center-align">Cadastrar Novo Produto</h5>

        {/* Mensagem de sucesso */}
        {successMessage && (
          <div style={{ marginBottom: "20px", color: "green", textAlign: "center" }}>
            {successMessage}
          </div>
        )}

        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="nome_produto"
                  type="text"
                  name="nomeProduto"
                  value={nomeProduto}
                  onChange={handleChange}
                  className="validate"
                />
                <label htmlFor="nome_produto">Nome</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="preco"
                  type="text"
                  name="preco"
                  value={preco}
                  onChange={handleChange}
                  className="validate"
                />
                <label htmlFor="preco">Preço</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="quantidade"
                  type="number"
                  name="quantidade"
                  value={quantidade}
                  onChange={handleChange}
                  className="validate"
                />
                <label htmlFor="quantidade">Quantidade</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button
                  style={botaoStyle}
                  type="submit"
                  name="action"
                >
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

export default CadProduto;
