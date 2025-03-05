const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusquedad ={
    moneda: '',
    criptomoneda: ''
}


//Crear un Promise
const obtenerCriptomonedas = (criptomonedas) => new Promise((resolve) => {
    resolve(criptomonedas);

    formulario.addEventListener('submit', submitFormulario);
    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);

}) 

document.addEventListener('DOMContentLoaded', () =>{
    consultarCriptomonedas();
})

function consultarCriptomonedas(){
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}

function leerValor(e){
    objBusquedad[e.target.name] = e.target.value;
}

function submitFormulario(e){
    e.preventDefault();

    //Validar
    const {moneda, criptomoneda} = objBusquedad;
    if(moneda === '' || criptomoneda === '' ){
        mostrarAlerta('*Ambos campos son obligatorios*');
        return
    }
    //Consultar Api con los resultados
    consultarAPI();

}

function mostrarAlerta(msg){
    const existeError = document.querySelector('.error');
    if(!existeError){

        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('error', );
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);
        
        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }
}

function consultarAPI(){
    
    const {moneda, criptomoneda} = objBusquedad;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]))
}

function mostrarCotizacionHTML(cotizacion){
    limpiarHTML();
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('P');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es <span class="font-semibold">${PRICE}</span>`;

    const precioAlto = document.createElement('P');
    precioAlto.innerHTML = `El precio más alto del día es <span class="font-semibold">${HIGHDAY}</span>`;

    const precioBajo = document.createElement('P');
    precioBajo.innerHTML = `El precio más bajo del día es <span class="font-semibold">${LOWDAY}</span>`;

    const cambio = document.createElement('P');
    cambio.innerHTML = `Variación últimas 24 horas <span class="font-semibold">${CHANGEPCT24HOUR} %</span> `;

    
    const actualizacion = document.createElement('P');
    actualizacion.innerHTML = `Última actualización <span class="font-semibold">${LASTUPDATE} </span> `;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(cambio);
    resultado.appendChild(actualizacion);

}

function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}