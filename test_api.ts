import axios from 'axios';

async function test() {
    try {
        const response = await axios.get('http://localhost:3000/products');
        console.log("Status:", response.status);
        if (response.data && response.data.products && response.data.products.length > 0) {
            console.log("Primeiro produto:", JSON.stringify(response.data.products[0], null, 2));
        } else {
            console.log("Nenhum produto encontrado ou estrutura diferente.");
            console.log(JSON.stringify(response.data, null, 2));
        }
    } catch (e) {
        console.error("Erro ao chamar API:", e.message);
    }
}

test();
