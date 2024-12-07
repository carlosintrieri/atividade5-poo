import { useState } from "react";
import CSS from "csstype";

const backgroundColor: CSS.Properties = {
  backgroundColor: "#000",
};

const botaoStyle: CSS.Properties = {
  padding: "10px",
  fontFamily: "arial",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const fontStyle: CSS.Properties = {
  fontSize: "xx-large",
  fontFamily: "arial",
  color: "#fff",
};

const FormularioEdicaoServico = ({ tema }: { tema: string }) => {
  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div>
      <nav>
        <div style={backgroundColor} className="nav-wrapper">
          <a className="brand-logo right" style={fontStyle}>
            World Beauty
          </a>
          <a style={botaoStyle} href="/cadServico">
            Cadastros
          </a>
          <a style={botaoStyle} href="/listaCliente">
            Cliente
          </a>
          <a style={botaoStyle} href="/listaProduto">
            Produto
          </a>
          <a style={botaoStyle} href="/listaPedidos">
            Consumo
          </a>
          <a style={botaoStyle} href="/listaServicos">
            Serviços
          </a>
          <a style={botaoStyle} href="/Listagens">
            Listagens
          </a>
        </div>
      </nav>
      <br />
      <div className="container">
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="nome_servico" type="text" className="validate" />
                <label htmlFor="nome_servico">Nome do Serviço</label>
              </div>
              <div className="input-field col s6">
                <input id="valor_servico" type="text" className="validate" />
                <label htmlFor="valor_servico">Valor do Serviço</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button
                  className={estiloBotao}
                  type="submit"
                  name="action"
                >
                  Alterar o serviço
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioEdicaoServico;
