import React, { useState } from 'react';
import ClientesValorComponent from './components/ClientesValorComponent';
import ClientesQtdComponent from './components/ClientesQtdComponent';
import ClientesMenorConsumoComponent from './components/ClientesMenorConsumoComponent';
import ProdutosServicosComponent from './components/ProdutosServicosComponent';
import ConsumoGeneroComponent from './components/ConsumoGeneroComponent';

const App = () => {
    const [activeTab, setActiveTab] = useState('clientesValor');

    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'clientesValor':
                return <ClientesValorComponent />;
            case 'clientesQtd':
                return <ClientesQtdComponent />;
            case 'clientesMenorConsumo':
                return <ClientesMenorConsumoComponent />;
            case 'produtosServicos':
                return <ProdutosServicosComponent />;
            case 'consumoGenero':
                return <ConsumoGeneroComponent />;
            default:
                return <div>Selecione uma aba</div>;
        }
    };

    return (
        <div>
            <nav>
                <button onClick={() => setActiveTab('clientesValor')}>Clientes por Valor</button>
                <button onClick={() => setActiveTab('clientesQtd')}>Clientes por Quantidade</button>
                <button onClick={() => setActiveTab('clientesMenorConsumo')}>Clientes Menor Consumo</button>
                <button onClick={() => setActiveTab('produtosServicos')}>Produtos e Serviços</button>
                <button onClick={() => setActiveTab('consumoGenero')}>Consumo por Gênero</button>
            </nav>
            {renderActiveComponent()}
        </div>
    );
};

export default App;
