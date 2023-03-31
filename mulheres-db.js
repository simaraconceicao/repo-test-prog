const express = require('express')
const conectaBancoDeDados = require('./db-async')
const cors = require('cors')
const router = express.Router()
const app = express()
const Mulher = require('./ModelMulher')

conectaBancoDeDados()
app.use(cors())
app.use(express.json())

const PORTA = 3333

//GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find()
    response.status(200).json(mulheresVindasDoBancoDeDados)
  } catch(err) {
    console.log(err)
  }
}

//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    citacao: request.body.citacao,
    minibio: request.body.minibio,
  })

  try { 
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  } catch (err) {
    console.log(err)
  }
}

//PATCH
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById({_id: request.params.id})

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)
  } catch (err) {
    console.log(err)
  }
}

//DELETE
async function deletaMulher(request, response) {
  try{ 
    await Mulher.findByIdAndDelete(request.params.id)   

    response.json({ message: 'mulher deletada com sucesso!'})
  } catch (err) {
    console.log(err)
  }
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
