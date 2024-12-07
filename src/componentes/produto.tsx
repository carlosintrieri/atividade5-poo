import { useState, useEffect } from "react";
import CSS from "csstype";
import editar from "../Assets/edit.png";
import excluir from "../Assets/delete.png";
import { Link } from "react-router-dom";

const backgroundColor: CSS.Properties = {
  backgroundColor: "#49786d",
};

const botaoStyle: CSS.Properties = {
  padding: "10px",
  fontFamily: "arial",
};

const fontStyle: CSS.Properties = {
  fontSize: "xx-large",
  fontFamily: "arial",
};

const ImagemStyle: CSS.Properties = {
  padding: "5px",
  maxHeight: "30px",
  maxWidth: "30px",
};

const Produto = () => {
  const [produtos, setProdutos] = useState<{ nomeProduto: string; preco: string }[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(storedProducts);
  }, []);

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
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => (
              <tr key={index}>
                <td>{produto.nomeProduto}</td>
                <td>{produto.preco}</td>
                <td>
                  <Link to={`/editProduto/${index}`}>
                    <img style={ImagemStyle} src={editar} alt="Editar" />
                  </Link>
                </td>
                <td>
                  <Link to={`/deleteProduto/${index}`}>
                    <img style={ImagemStyle} src={excluir} alt="Excluir" />
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

export default Produto;
