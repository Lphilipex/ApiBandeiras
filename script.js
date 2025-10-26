const { ACTION } = require("next/dist/client/components/app-router-headers");
const { default: PageLoader } = require("next/dist/client/page-loader");

const Url = "https://restcountries.com/v3.1/currency/cop"


function capturardados(){
    let inputdados = document.getElementById("nomepesquisa").value
    console.log(inputdados);
    buscarPais(inputdados)
    
}

async function buscarPais(inputdados) {
    let dados = await fetch(`https://restcountries.com/v3.1/alpha/${inputdados}`)
    .then(response => response.json())
    console.log(dados)
    exibix(dados)
    
}


function exibix(dados) {
  if (Array.isArray(dados) && dados.length > 0) {
    const pais = dados[0];
    document.getElementById("nomePais").innerHTML = `Nome: ${pais.altSpellings[0]}`;
    document.getElementById("img").src = pais.flags.png;
    document.getElementById("capital").innerHTML = `Capital: ${pais.capital[0]}`;
    document.getElementById("regiao").innerHTML = `Região: ${pais.region}`;

    const moedaKeys = Object.keys(pais.currencies);
    const moeda = pais.currencies[moedaKeys[0]];
    document.getElementById("moeda").innerHTML = `Moeda: ${moeda.name} (${moeda.symbol})`;

    const linguas = Object.values(pais.languages).join(", ");
    document.getElementById("lingua").innerHTML = `Língua falada: ${linguas}`;
  } else {
    PageLoader
    document.getElementById("nomePais").innerHTML = "País não encontrado";
    document.getElementById("img").src = "./assets/flag.png";
    document.getElementById("capital").innerHTML = "";
    document.getElementById("regiao").innerHTML = "";
    document.getElementById("moeda").innerHTML = "";
    document.getElementById("lingua").innerHTML = "";
    console.warn("Nenhum país encontrado para a entrada fornecida.");
  }
}
