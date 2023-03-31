const express = require('express')
const connectDatabase = require('./src/database/db')
const app = express()
const PORTA = 3333

connectDatabase()
app.use(express.json())

function mostraPorta() {
  console.log(`Servidor criado e rodando na porta ${PORTA}`)
}

app.listen(PORTA, mostraPorta)