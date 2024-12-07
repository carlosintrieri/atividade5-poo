import React from "react";
import { Link } from "react-router-dom";  // Importar o Link para navegação
import CSS from "csstype";

const backgroundColor: CSS.Properties = {
  backgroundColor: "#000", // Fundo preto
};

const botaoStyle: CSS.Properties = {
  padding: "10px",
  fontFamily: "arial",
  backgroundColor: "#000", // Fundo do botão preto
  color: "#fff", // Texto do botão branco
  border: "none", // Remove bordas
  cursor: "pointer", // Alterar cursor para indicar que é clicável
};

const fontStyle: CSS.Properties = {
  fontSize: "xx-large",
  fontFamily: "arial",
  color: "#fff", // Texto branco
};

const PaginaInicial: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("cliente");

  // Função para mudar a aba ativa
  const setActiveTabHandler = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <nav style={backgroundColor}>
        <div className="nav-wrapper">
          <a className="brand-logo center" style={fontStyle}>
            World Beauty
          </a>
        </div>
      </nav>
      <br />
      <div className="container">
        <div className="center-align">
          <div className="tabs">
            <button
              style={botaoStyle}
              className={`tab-button ${activeTab === "cliente" ? "active" : ""}`}
              onClick={() => setActiveTabHandler("cliente")}
            >
              Cadastrar Clientes
            </button>
            <button
              style={botaoStyle}
              className={`tab-button ${activeTab === "produto" ? "active" : ""}`}
              onClick={() => setActiveTabHandler("produto")}
            >
              Cadastrar Produtos
            </button>
            <button
              style={botaoStyle}
              className={`tab-button ${activeTab === "servico" ? "active" : ""}`}
              onClick={() => setActiveTabHandler("servico")}
            >
              Cadastrar Serviços
            </button>
            <button
              style={botaoStyle}
              className={`tab-button ${activeTab === "pedido" ? "active" : ""}`}
              onClick={() => setActiveTabHandler("pedido")}
            >
              Cadastrar Consumo
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "cliente" && (
              <div>
                <h3>Cadastrar Cliente</h3>
                <p>Aqui você pode cadastrar um cliente.</p>
                <a href="/formularioCadastroCliente" className="waves-effect waves-light btn grey darken-4">
                  Acessar Cadastro de Clientes
                </a>
              </div>
            )}
            {activeTab === "produto" && (
              <div>
                <h3>Cadastrar Produto</h3>
                <p>Aqui você pode cadastrar um produto.</p>
                <a href="/formularioCadastroProduto" className="waves-effect waves-light btn grey darken-4">
                  Acessar Cadastro de Produtos
                </a>
              </div>
            )}
            {activeTab === "servico" && (
              <div>
                <h3>Cadastrar Serviço</h3>
                <p>Aqui você pode cadastrar um serviço.</p>
                <a href="/formularioCadastroServico" className="waves-effect waves-light btn grey darken-4">
                  Acessar Cadastro de Serviços
                </a>
              </div>
            )}
            {activeTab === "pedido" && (
              <div>
                <h3>Cadastrar Consumo</h3>
                <p>Aqui você pode cadastrar um consumo.</p>
                <a href="/formularioCadastroPedido" className="waves-effect waves-light btn grey darken-4">
                  Acessar Cadastro de Consumo
                </a>
              </div>
            )}
          </div>

          {/* Botão "ENTRAR" agora é um Link para a página listCliente */}
          <br />
          <Link to="/listaCliente">
            <div style={{
              display: "flex",          // Usando Flexbox
              justifyContent: "center", // Centraliza o conteúdo horizontalmente
              alignItems: "center",     // Centraliza o conteúdo verticalmente
              height: "100vh"            // Ocupa a altura total da tela
            }}>
              <button
                style={{
                  padding: "10px 20px",
                  fontFamily: "arial",
                  backgroundColor: "#000", // Fundo do botão preto
                  color: "#fff",           // Texto do botão branco
                  border: "none",          // Remove bordas
                  cursor: "pointer",       // Alterar cursor para indicar que é clicável
                  display: "flex",          // Usando flexbox para centralizar o conteúdo
                  justifyContent: "center", // Centraliza o texto horizontalmente
                  alignItems: "center",     // Centraliza o texto verticalmente
                  textAlign: "center",      // Garante o alinhamento correto do texto
                  width: "150px",
                  // Largura fixa do botão (opcional)
                }}
                className="waves-effect waves-light btn grey darken-4"
              >
                ENTRAR
              </button>
            </div>


          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaginaInicial;
