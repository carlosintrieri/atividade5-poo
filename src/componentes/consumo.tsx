import React, { useState } from "react";
import CSS from "csstype";
import editar from "../Assets/edit.png";
import excluir from "../Assets/delete.png";
import { Link } from "react-router-dom";

// Estilos CSS
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

const ImagemStyle: CSS.Properties = {
  padding: "5px",
  maxHeight: "30px",
  maxWidth: "30px",
};

// Definição do tipo Consumo
type Consumo = {
  idPedido: string;
  idProduto: string;
  nomeProduto: string;
  valor: string;
};

const Pedidos = () => {
  const [consumos, setConsumos] = useState<Consumo[]>([
    {
      idPedido: "001",
      idProduto: "P001",
      nomeProduto: "Produto 1",
      valor: "100,00",
    },
    {
      idPedido: "002",
      idProduto: "P002",
      nomeProduto: "Produto 2",
      valor: "150,00",
    },
    // Adicione mais consumos conforme necessário
  ]);

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
        <h5 className="center-align">Consumo</h5>
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Id_Pedido</th>
              <th>Id_Produto</th>
              <th>Nome do Produto</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consumos.map((consumo, index) => (
              <tr key={index}>
                <td>{consumo.idPedido}</td>
                <td>{consumo.idProduto}</td>
                <td>{consumo.nomeProduto}</td>
                <td>{consumo.valor}</td>
                <td>
                  <Link to={`/editarPedido/${consumo.idPedido}`}>
                    <img src={editar} alt="Editar" style={ImagemStyle} />
                  </Link>
                  <Link to={`/excluirPedido/${consumo.idPedido}`}>
                    <img src={excluir} alt="Excluir" style={ImagemStyle} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pedidos;
