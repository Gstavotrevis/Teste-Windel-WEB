const getLocalStorage = () => JSON.parse(localStorage.getItem('db_produto')) ?? []
const setLocalStorage = (dbProduto) => localStorage.setItem("db_produto", JSON.stringify(dbProduto))

// CRUD - DELETE
const deleteProduto = (index) => {
    const dbProduto = readProduto()
    dbProduto.splice(index, 1)
    setLocalStorage(dbProduto)
}

// CRUD - UPDATE
const updateProduto = (index, produto) => {
    const dbProduto = readProduto()
    dbProduto[index] = produto
    setLocalStorage(dbProduto)
}

// CRUD - READ
const readProduto = () => getLocalStorage()

// CRUD - CREATE
const createProduto = (produto) => {
    const dbProduto = getLocalStorage()
    dbProduto.push (produto)
    localStorage.setItem("db_produto", JSON.stringify(dbProduto))
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity() //criado o <form> posteriormente para realizar a validação
}

//INTERACAO LAYOUT
const clearFields = () => {
    const fields = document.querySelectorAll('.input_box')
    fields.forEach(field => field.value = "")
}

const saveProduto = () => {
    if (isValidFields()){
        const produto = {
            nome: document.getElementById("nome").value,
            valor: document.getElementById("valor").value,
            referencia: document.getElementById("referencia").value,
            unidade: document.getElementById("unidade").value,
            fabricante: document.getElementById("fabricante").value,
            estoque: document.getElementById("estoque").value
        }
        createProduto(produto)
        updateDiv()
        clearFields()
    }
}

const createDiv = (produto) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add("produto");
    newDiv.innerHTML = ` 
    <div id="grid-produtos" class="grid-produtos">
        <div id="celula-produto" class="celula-produto cel-img">img</div>
        <div id="celula-produto" class="celula-produto cel-nome">${produto.nome}</div>
        <div id="celula-produto" class="celula-produto cel-ref">${produto.referencia}</div>
        <div id="celula-produto" class="celula-produto cel-vlr">R$${produto.valor}</div>
        <div id="celula-produto" class="celula-produto cel-fab">${produto.fabricante}</div>
        <div id="celula-produto" class="celula-produto cel-estq">${produto.estoque} ${produto.unidade}</div>
        <div id="celula-produto" class="celula-produto cel-lixo">
            <button type="button" class="btn-edit" data-action="edit" id="edit">
                <svg type="button" class="cel-edit-svg btn-lixo teste" id="edit" class="cel-edit-svg" width="19" height="26" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0316 1.15324C17.2391 -0.384412 19.1984 -0.384412 20.4059 1.15324L20.9258 1.81605C22.1332 3.35386 22.1332 5.84706 20.9258 7.38378L12.4523 18.1736C12.0785 18.6439 11.6187 18.9885 11.1117 19.1744L6.81484 20.7385C6.45391 20.8697 6.06719 20.7385 5.80078 20.3557C5.53867 20.0658 5.43555 19.5736 5.53867 19.1143L6.76758 13.6455C6.91367 13.0002 7.18437 12.415 7.55391 11.9393L16.0316 1.15324ZM18.9105 3.00933C18.5453 2.49691 17.8922 2.49691 17.4883 3.00933L16.2379 4.60019L18.2187 7.12128L19.4691 5.48066C19.873 5.01581 19.873 4.18456 19.4691 3.67214L18.9105 3.00933ZM8.75273 14.3674L8.03086 17.5666L10.5445 16.6478C10.7164 16.5877 10.8668 16.4728 10.9914 16.3143L16.7621 8.97519L14.7812 6.4541L9.01484 13.7986C8.89023 13.9572 8.8 14.1486 8.75273 14.3674ZM8.59375 3.28769C9.16523 3.28769 9.625 3.87558 9.625 4.60019C9.625 5.32753 9.16523 5.91269 8.59375 5.91269H3.78125C2.83207 5.91269 2.0625 6.8916 2.0625 8.10019V22.9752C2.0625 24.1838 2.83207 25.1627 3.78125 25.1627H15.4687C16.4184 25.1627 17.1875 24.1838 17.1875 22.9752V16.8502C17.1875 16.1228 17.6473 15.5377 18.2187 15.5377C18.7902 15.5377 19.25 16.1228 19.25 16.8502V22.9752C19.25 25.633 17.557 27.7877 15.4687 27.7877H3.78125C1.69297 27.7877 0 25.633 0 22.9752V8.10019C0 5.44238 1.69297 3.28769 3.78125 3.28769H8.59375Z" fill="#B9885C"/>
                </svg>
            </button>
            <button type="button" class="btn-lixo" data-action="delete" id="delete">
                <svg type="button" class="cel-lixo-svg btn-lixo teste" id="lixo" class="cel-lixo-svg" width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.2083 5H15.0417V2.5C15.0417 1.39688 14.3316 0.5 13.4583 0.5H5.54167C4.66836 0.5 3.95833 1.39688 3.95833 2.5V5H0.791667C0.353776 5 0 5.44687 0 6V7C0 7.1375 0.0890625 7.25 0.197917 7.25H1.69219L2.30326 23.5938C2.34284 24.6594 3.04049 25.5 3.88411 25.5H15.1159C15.962 25.5 16.6572 24.6625 16.6967 23.5938L17.3078 7.25H18.8021C18.9109 7.25 19 7.1375 19 7V6C19 5.44687 18.6462 5 18.2083 5ZM13.2604 5H5.73958V2.75H13.2604V5Z" fill="#E53E3E"/>
                </svg>
            </button>
        </div>
    </div>
    `
    document.querySelector('#section_produtos>#tabela-produtos').appendChild(newDiv)
}

const clearDiv = () => {
    const divs = document.querySelectorAll('#tabela-produtos>.produto')
    divs.forEach(div => div.parentNode.removeChild(div))
}

const updateDiv = () => {
    const dbProduto = readProduto()
    clearDiv()
    dbProduto.forEach(createDiv)
}

const editDelete = (event) => {
    if (event.target.type == 'button'){
        console.log (event.target.dataset.action)
    }
}

updateDiv() //sem o update aqui, a página carrega sem nenhum produto cadastrado

//EVENTOS
document.getElementById('salvar')
    .addEventListener('click', saveProduto)

document.querySelector('#tabela-produtos>.produto')
    .addEventListener('click', editDelete)