import axios from 'axios';

// Função para buscar dados
const fetchData = async (url, method = 'GET', data = null) => {
    try {
        const config = {
            method,
            url: `http://localhost:3000${url}`, // URL do backend
            data: data || {},  // Adiciona dados para POST ou PUT
        };

        const response = await axios(config);
        return response.data;  // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        throw error;  // Lança o erro para ser tratado
    }
};

export default fetchData;
