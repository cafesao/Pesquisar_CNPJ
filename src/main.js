import { WSCnpnj, erroCnpj } from "./funcoes"
import { apagarResultado } from "../../Correios_Pesquisar/src/funcoes"

var inputCnpj = document.querySelector('input#inputCnpj')
var botaoPesquisar = document.querySelector('button#botaoPesquisar')
var divResultado = document.querySelector('div#resultado')

botaoPesquisar.addEventListener('click', pesquisar)

inputCnpj.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) { 
        pesquisar()
    }
})

function pesquisar() {
    if(inputCnpj.value.length != 14){
        erroCnpj()
    }
    else{
        apagarResultado(divResultado)
        WSCnpnj(inputCnpj.value, divResultado)
    }
}

