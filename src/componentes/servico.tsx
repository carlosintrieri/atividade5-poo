import { Component } from "react";
import CSS from "csstype";
import editar from "../Assets/edit.png";
import excluir from "../Assets/delete.png";
import { Link } from "react-router-dom";

type props = {
  tema: string;
};

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
const ImagemStyle: CSS.Properties = {
  padding: "5px",
  maxHeight: "30px",
  maxWidth: "30px",
};

export default class Servicos extends Component<any, props> {
  render() {
    return (
      <div>
        <>
          <nav className="">
            <div style={backgroundColor} className="nav-wrapper">
              <a className="brand-logo center" style={fontStyle}>
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
        </>
        <br />
        <div className="container">
          <table className="highlight centered">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Preço</th>
              </tr>
            </thead>

            <tbody>
              {/* Serviço 1 */}
              <tr>
                <td>Depilação Facial</td>
                <td>R$ 50,00</td>
                <td>
                  <Link to="/formularioEdicaoServico">
                    <img src={editar} style={ImagemStyle} alt="editar" />
                  </Link>
                  <img src={excluir} style={ImagemStyle} alt="excluir" />
                </td>
              </tr>
              {/* Serviço 2 */}
              <tr>
                <td>Hidratação Capilar</td>
                <td>R$ 80,00</td>
                <td>
                  <Link to="/formularioEdicaoServico">
                    <img src={editar} style={ImagemStyle} alt="editar" />
                  </Link>
                  <img src={excluir} style={ImagemStyle} alt="excluir" />
                </td>
              </tr>
              {/* Serviço 3 */}
              <tr>
                <td>Manicure e Pedicure</td>
                <td>R$ 40,00</td>
                <td>
                  <Link to="/formularioEdicaoServico">
                    <img src={editar} style={ImagemStyle} alt="editar" />
                  </Link>
                  <img src={excluir} style={ImagemStyle} alt="excluir" />
                </td>
              </tr>
              {/* Serviço 4 */}
              <tr>
                <td>Design de Sobrancelhas</td>
                <td>R$ 45,00</td>
                <td>
                  <Link to="/formularioEdicaoServico">
                    <img src={editar} style={ImagemStyle} alt="editar" />
                  </Link>
                  <img src={excluir} style={ImagemStyle} alt="excluir" />
                </td>
              </tr>
              {/* Serviço 5 */}
              <tr>
                <td>Maquiagem Profissional</td>
                <td>R$ 120,00</td>
                <td>
                  <Link to="/formularioEdicaoServico">
                    <img src={editar} style={ImagemStyle} alt="editar" />
                  </Link>
                  <img src={excluir} style={ImagemStyle} alt="excluir" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
