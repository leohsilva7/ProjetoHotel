const apiUrl = `http://localhost:5084/api/Quartos`;
const container = document.getElementById('container');
const select = document.getElementById('select-id');
const typeInput = document.getElementById('tipo-id');
const priceInput = document.getElementById('preco-id');
const searchInput = document.getElementById('pesquisa-id');
const searchBtn = document.getElementById('pesquisar-btn');

async function getAll(){
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const html = `
            <div class="container">
                    <div class="row row-cols-3 row-cols-md-5 g-3 justify-content-center">
                        ${data.map(quarto => `
                            <div class="col">
                                <div class="card text-bg-secondary mb-3 p-3">
                                    <div class="card-header">
                                        <h5 class="card-title">#${quarto.id} Nome do Hotel: ${quarto.nomeHotel}</h5>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">Tipo: ${quarto.tipo}</p>
                                        <p class="card-text">Preço: ${quarto.preco}</p>        
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
async function createQuarto(event){
    event.preventDefault();
    try {
        const formData = {
            hotelId: select.value,
            tipo: typeInput.value,
            preco: priceInput.value
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
        const html = `
            <div class="container">
                <div class="row row-cols-3 row-cols-md-5 g-3 justify-content-center">
                        <div class="col">
                            <div class="card text-bg-secondary mb-3 p-3">
                                <div class="card-header">
                                    <h5 class="card-title">#${data.id} Hotel: ${data.nomeHotel}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Tipo: ${data.tipo}</p>
                                    <p class="card-text">Preço: ${data.preco}</p>       
                                </div>
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
async function insertIntoSelect(){
    try {
        const res = await fetch('http://localhost:5084/api/Hoteis');
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        return select.innerHTML = data.map((hotel) => {
           return `
               <option value="${hotel.id}">${hotel.nome}</option>
           `
        });
    }
    catch (error){
        console.error(error.message);
    }
}
addEventListener("DOMContentLoaded", getAll);
addEventListener("DOMContentLoaded", insertIntoSelect);