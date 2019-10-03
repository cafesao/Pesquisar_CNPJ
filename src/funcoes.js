import axios from 'axios'
export {WSCnpnj, erroCnpj, apagarResultado}

const objectCnpj = {}
const objectCep = {}

async function WSCnpnj (inputCnpj, div) { 
    try{
        carregando(true, div)
        const cnpjAxios = await axios.get(`https://cors-anywhere.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/${inputCnpj}`)
        const { abertura, atividade_principal, cnpj, cep, numero, fantasia, nome, situacao, telefone, status } = cnpjAxios.data 

        objectCnpj.cnpj = cnpj
        objectCnpj.nome = nome
        objectCnpj.fantasia = fantasia
        objectCnpj.abertura = abertura
        objectCnpj.atividade = atividade_principal[0].text
        objectCnpj.telefone = telefone
        objectCnpj.cep = cep
        objectCep.numero = numero
        objectCnpj.situacao = situacao
        objectCnpj.status = status

        let cepModificado = modificarCep(cep)

        WSCep(cepModificado, div)
        carregando(false, div)

        if(objectCnpj.status == 'ERROR'){
            erroCnpj()
        }
    }
    catch{
        carregando(false, div)
        alert('[ERROR] Você fez muitas requisições, espere 1 minuto.')
    }
}

async function WSCep (cep, div) {
    try {
        const cepAxios = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const { logradouro, bairro, localidade, uf } = cepAxios.data

        objectCep.rua = logradouro
        objectCep.bairro = bairro        
        objectCep.cidade = localidade        
        objectCep.estado = uf 
        
        adicionarResultado(div)
    }
    catch {}
}

function modificarCep(cep){
    cep = cep.replace(/\.|\-/g, '')
    return cep
}

function carregando(carregando = false, div) {
    if(carregando == true){
        let elementoCarregando = document.createElement('p')
        let textoCarregando = document.createTextNode('Carregando...')
        elementoCarregando.setAttribute('id', 'carregando')
        elementoCarregando.appendChild(textoCarregando)
        div.appendChild(elementoCarregando)
    }
    else {
        document.querySelector('#carregando').remove()
    }
}

function adicionarResultado(div) {
    let cnpjElemento = document.createElement('p')    
    let nomeElemento = document.createElement('p')
    let fantasiaElemento = document.createElement('p')
    let aberturaElemento = document.createElement('p')
    let atividadeElemento = document.createElement('p')
    let telefoneElemento = document.createElement('p')
    let cepElemento = document.createElement('p')
    let ruaElemento = document.createElement('p')
    let numeroElemento = document.createElement('p')
    let bairroElemento = document.createElement('p')
    let cidadeElemento = document.createElement('p')
    let estadoElemento = document.createElement('p')    
    let situacaoElemento = document.createElement('p')    

    let cnpjTexto = document.createTextNode(`CNPJ: ${objectCnpj.cnpj}`)
    let nomeTexto = document.createTextNode(`Nome: ${objectCnpj.nome}`)
    let fantasiaTexto = document.createTextNode(`Nome Fantasia: ${objectCnpj.fantasia}`)
    let aberturaTexto = document.createTextNode(`Abertura da empresa: ${objectCnpj.abertura}`)
    let atividadeTexto = document.createTextNode(`Atividade principal: ${objectCnpj.atividade}`)
    let telefoneTexto = document.createTextNode(`Telefone: ${objectCnpj.telefone}`)
    let cepTexto = document.createTextNode(`CEP: ${objectCnpj.cep}`)
    let ruaTexto = document.createTextNode(`Rua: ${objectCep.rua}`)
    let numeroTexto = document.createTextNode(`Numero: ${objectCep.numero}`)
    let bairroTexto = document.createTextNode(`Bairro: ${objectCep.bairro}`)
    let cidadeTexto = document.createTextNode(`Cidade: ${objectCep.cidade}`)
    let estadoTexto = document.createTextNode(`Estado: ${objectCep.estado}`)    
    let situacaoTexto = document.createTextNode(`Situação: ${objectCnpj.situacao}`)  

    cnpjElemento.appendChild(cnpjTexto)
    nomeElemento.appendChild(nomeTexto)
    fantasiaElemento .appendChild(fantasiaTexto)
    aberturaElemento .appendChild(aberturaTexto)
    atividadeElemento.appendChild(atividadeTexto)
    telefoneElemento .appendChild(telefoneTexto)
    cepElemento.appendChild(cepTexto)
    ruaElemento.appendChild(ruaTexto)
    numeroElemento.appendChild(numeroTexto)
    bairroElemento.appendChild(bairroTexto)
    cidadeElemento.appendChild(cidadeTexto)
    estadoElemento.appendChild(estadoTexto)
    situacaoElemento .appendChild(situacaoTexto)

    div.appendChild(cnpjElemento)
    div.appendChild(nomeElemento)
    div.appendChild(fantasiaElemento)
    div.appendChild(aberturaElemento)
    div.appendChild(atividadeElemento)
    div.appendChild(telefoneElemento)
    div.appendChild(cepElemento)
    div.appendChild(ruaElemento)  
    div.appendChild(numeroElemento)
    div.appendChild(bairroElemento)    
    div.appendChild(cidadeElemento)    
    div.appendChild(estadoElemento)
    div.appendChild(situacaoElemento)    
} 

function apagarResultado(div) {
    div.innerHTML = ''
}

function erroCnpj() {
    alert('[ERROR] CNPJ Invalido, verifique!')
    console.warn('[ERROR] O CNPJ esta incorreto, verifique e tente novamente!')
}