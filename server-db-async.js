const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const conectaBancoDeDados = require('./db-async')
const app = express()
const PORTA = 3333

const Mulher = require('./ModelMulher')

conectaBancoDeDados()
app.use(express.json())

const create =  async (req,res) => {
  const mulher = new Mulher({
    _id:  new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    imagem: req.body.imagem,
    citacao: req.body.citacao,
    bio: req.body.bio,
    criadoEm: req.body.criadoEm
  })
  
  const mulherJaExiste = await Mulher.findOne({nome: req.body.nome})

  if (mulherJaExiste) {
    return res.status(400).json({error: 'Mulher já cadastrada.'})
  }

  try { 
    const novaMulher = await mulher.save()
    res.status(201).json(novaMulher)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

app.use(router.post('/mulheres', create))

function mostraPorta() {
  console.log(`Servidor criado e rodando na porta ${PORTA}`)
}

app.listen(PORTA, mostraPorta)