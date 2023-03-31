const express = require('express')
const router = express.Router()
const app = express()
const { v4: uuidv4 } = require('uuid')

app.use(express.json())

const PORTA = 3333

//lista com mulheres
let listaDeMulheres = [
  {
    id: '1',
    nome: 'Simara Conceição',
    imagem: 'https://bit.ly/3LJIyOF',
    minibio: 'Desenvolvedora, instrutora e criadora de conteúdo'
  },
  {
    id: '2',
    nome: 'Iana Chan',
    imagem: 'https://bit.ly/3JCXBqP',
    minibio: 'CEO & Founder da PrograMaria'
  },
  {
    id: '3',
    nome: 'Luana Pimentel',
    imagem: 'https://bit.ly/3FKpFaz',
    minibio: 'Senior Staff Software Engineer at OLX Brasil'
  }
]

//GET
function mostraMulheres(request, response) {
  response.json(listaDeMulheres)
}

//POST
function criaMulher(request, response) {
  const novaMulher = {
    id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio
  }

  listaDeMulheres.push(novaMulher)

  response.json(listaDeMulheres)
}

//PATCH
function corrigeMulher(request, response) {
  function encontraMulher(mulher) {
    if (mulher.id === request.params.id) {
      return mulher
    }
  }

  const mulherEncontrada = listaDeMulheres.find(encontraMulher)

  if (request.body.nome) {
    mulherEncontrada.nome = request.body.nome
  }

  if (request.body.minibio) {
    mulherEncontrada.minibio = request.body.minibio
  }

  if (request.body.imagem) {
    mulherEncontrada.imagem = request.body.imagem
  }

  response.json(listaDeMulheres)
}

//DELETE
function deletaMulher(request, response) {
  function todasMenosEla(mulher) {
    if (mulher.id !== request.params.id) {
      return mulher
    }
  }

  listaDeMulheres = listaDeMulheres.filter(todasMenosEla)

  response.json(listaDeMulheres)
}

//rotas
app.use(router.get('/mulheres', mostraMulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher))

function mostraPorta() {
  console.log(`Servidor criado e rodando na porta ${PORTA}`)
}

app.listen(PORTA, mostraPorta)
