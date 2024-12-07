// ProdutoServicoConsumo.tsx
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ProdutoServicoConsumo = () => {
    const [produtosServicosConsumo, setProdutosServicosConsumo] = useState<any[]>([]);
    const [editando, setEditando] = useState<boolean>(false);
    const [produtoServicoEditado, setProdutoServicoEditado] = useState<any | null>(null);

    useEffect(() => {
        setProdutosServicosConsumo([
            { id: 1, nome: "Produto A", consumo: 500 },
            { id: 2, nome: "Serviço B", consumo: 300 },
            { id: 3, nome: "Produto C", consumo: 200 },
        ]);
    }, []);

    const handleRegistro = () => {
        const novoProdutoServico = { id: produtosServicosConsumo.length + 1, nome: "Novo Produto/Serviço", consumo: 100 };
        setProdutosServicosConsumo([...produtosServicosConsumo, novoProdutoServico]);
    };

    const handleEdição = (produtoServico: any) => {
        setEditando(true);
        setProdutoServicoEditado(produtoServico);
    };

    const handleDelecao = (id: number) => {
        setProdutosServicosConsumo(produtosServicosConsumo.filter(produtoServico => produtoServico.id !== id));
    };

    const handleSalvarEdicao = () => {
        setProdutosServicosConsumo(produtosServicosConsumo.map(produtoServico =>
            produtoServico.id === produtoServicoEditado.id ? produtoServicoEditado : produtoServico
        ));
        setEditando(false);
        setProdutoServicoEditado(null);
    };

    return (
        <div>
            <h3>Produtos/Serviços por Consumo</h3>
            <Button variant="primary" onClick={handleRegistro}>Registrar Produto/Serviço</Button>
            <ul>
                {produtosServicosConsumo.map(produtoServico => (
                    <li key={produtoServico.id}>
                        {editando && produtoServico.id === produtoServicoEditado?.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={produtoServicoEditado?.nome}
                                    onChange={(e) => setProdutoServicoEditado({ ...produtoServicoEditado, nome: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={produtoServicoEditado?.consumo}
                                    onChange={(e) => setProdutoServicoEditado({ ...produtoServicoEditado, consumo: +e.target.value })}
                                />
                                <Button variant="success" onClick={handleSalvarEdicao}>Salvar</Button>
                            </div>
                        ) : (
                            <div>
                                {produtoServico.nome} - {produtoServico.consumo} unidades
                                <Button variant="info" onClick={() => handleEdição(produtoServico)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelecao(produtoServico.id)}>Deletar</Button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProdutoServicoConsumo;
