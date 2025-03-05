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
    console.log(objBusquedad)
}

function submitFormulario(e){
    e.preventDefault();

    //Validar
    const {moneda, criptomoneda} = objBusquedad;
    if(moneda === '' || criptomoneda === '' ){
        mostrarAlerta('*Ambos campos son obligatorios*');
        return
    }
}

function mostrarAlerta(msg){
    const existeError = document.querySelector('.error');
    if(!existeError){

        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('error', );
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);
        
        
    }
}