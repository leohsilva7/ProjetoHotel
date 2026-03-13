const apiUrl = `http://localhost:5084/api/Hoteis`;
const container = document.getElementById('container');
const nameInput = document.getElementById('name-id');
const cityInput = document.getElementById('cidade-id');
const starsInput = document.getElementById('estrelas-id');
const searchInput = document.getElementById('pesquisa-id');
const searchBtn = document.getElementById('pesquisar-btn');

async function getAll(){
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const html = `
            <div class="container">
                    <div class="row row-cols-3 row-cols-md-4 g-3">
                        ${data.map(hotel => `
                            <div class="col">
                                <div class="card text-bg-secondary mb-3 p-3">
                                    <div class="card-header">
                                        <h5 class="card-title">#${hotel.id} ${hotel.nome}</h5>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">Cidade: ${hotel.cidade}</p>
                                        <p class="card-text">Quantidade de Estrelas: ${hotel.qtdEstrelas}</p>        
                                    </div>
                            </div>
                        </div>
                        `).join("")}
                    </div>
            </div>
        `
        return container.innerHTML = html;
    }
    catch (error){
        console.error(error.message);
    }
}
async function createHotel(event){
    event.preventDefault();
    try {
        const formData = {
            nome: nameInput.value,
            cidade: cityInput.value,
            qtdEstrelas: starsInput.value,
        }
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        await getAll();
    }
    catch (error){
        console.error(error.message)
    }
}
async function getById(id){
    try{
        container.innerHTML = '';
        const res = await fetch(`${apiUrl}/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const eachQuarto = data.quartos.map((quarto) => {
            return `
                <div class="card border-secondary mb-3" style="max-width: 18rem">
                    <div class="card-header">
                        #${quarto.id}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Tipo: ${quarto.tipo}</h5>
                        <p class="card-text">Preço: ${quarto.preco}</p>
                    </div>
                </div>
            `
        }).join("");
        const html = `
            <div class="container">
                <div class="row row-cols-3 row-cols-md-4 g-3 justify-content-center">
                        <div class="col">
                            <div class="card text-bg-secondary mb-3 p-3">
                                <div class="card-header">
                                    <h5 class="card-title">#${data.id} ${data.nome}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Cidade: ${data.cidade}</p>
                                    <p class="card-text">Quantidade de Estrelas: ${data.qtdEstrelas}</p>       
                                </div>
                                <h3>Quartos: </h3>
                                <div>${eachQuarto}</div>
                            </div>
                        </div>
                </div>
            </div>
        `
        return container.innerHTML = html;
    }
    catch (error){
        console.error(error.message);
    }
}
searchBtn.addEventListener('click', async () => {
    await getById(searchInput.value);
});
addEventListener("DOMContentLoaded", getAll);