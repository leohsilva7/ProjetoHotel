const apiUrl = `http://localhost:5084/api/Hoteis`;
const container = document.getElementById('container');
const nameInput = document.getElementById('name-id');
const cityInput = document.getElementById('cidade-id');
const starsInput = document.getElementById('estrelas-id');

async function getAll(){
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const html  =  `
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${data.map(hotel => `
                <div class="col">
                    <div class="card h-100 text-bg-secondary">
                        <div class="card-header">
                            <h5 class="card-title mb-0">#${hotel.id} ${hotel.nome}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                ⭐ ${hotel.qtdEstrelas} estrelas
                            </p>
                            <button 
                                class="btn btn-outline-light btn-sm"
                                onclick="showDetails(${hotel.id})"
                                >
                                    Ver detalhes
                            </button>
                        <div id="details-${hotel.id}" style="display: none;" class="mt-3"></div>
                        </div>
                    </div>
                </div>
                `).join("")}
            </div>      
        `;
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
async function showDetails(hotelId){
    const detailsContainer = document.getElementById(`details-${hotelId}`);
    if (detailsContainer.style.display === 'none'){
        await showHoteis(hotelId);
        return detailsContainer.style.display = 'flex';
    }
    detailsContainer.innerHTML = '';
    return detailsContainer.style.display = 'none';
}
async function showHoteis(id){
    const detailsContainer = document.getElementById(`details-${id}`);
    try{
        detailsContainer.innerHTML = '';
        const res = await fetch(`${apiUrl}/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const quarto = data.quartos.map((quarto) => {
            return `
                <div class="col">
                    <div class="card border-secondary h-100">
                    <div class="card-header">
                        Quarto #${quarto.id}
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${quarto.tipo}</h6>
                        <p class="card-text">💰 R$ ${quarto.preco}</p>
                    </div>
                    </div>
                </div>
    `
        }).join("");
        const html = `
            <div class="container my-3 w-100"> 
                <div class="card text-bg-secondary mb-3 p-3">
                    <div class="card-header">
                        <h5 class="card-title">#${data.id} ${data.nome}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Cidade: ${data.cidade}</p>
                        <p class="card-text">Quantidade de Estrelas: ${data.qtdEstrelas}</p>
                        <div class="row row-cols-1 row-cols-md-2 g-3">
                            ${quarto}
                        </div>  
                    </div>
                </div>
            </div>
        `
        return detailsContainer.innerHTML = html;
    }
    catch (error){
        console.error(error.message);
    }
}
addEventListener("DOMContentLoaded", getAll);