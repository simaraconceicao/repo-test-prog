const express = require('express')
const router = express.Router()
const app = express()

app.use(express.json())

const PORTA = 3333

const listaDeMulheres = [
  {
    nome: 'Simara Conceição',
    imagem: 'https://github.com/simaraconceicao.png',
    minibio: 'Desenvolvedora, instrutora e criadora de conteúdo',
  },
  {
    nome: 'Iana Chan',
    imagem: 'https://media.licdn.com/dms/image/C4D03AQE-aD7nj2W_0Q/profile-displayphoto-shrink_200_200/0/1563383651406?e=1684368000&v=beta&t=ainpd4H0t_GxkUDAIQB_7OG_C8MiNEqe1_nq5Rw4WBQ',
    minibio: 'CEO & FounderCEO & Founder da PrograMaria',
  },
  {
    nome: 'Luana Pimentel',
    imagem: 'https://media.licdn.com/dms/image/C4D03AQGo9pEAWnA3vw/profile-displayphoto-shrink_200_200/0/1580595733430?e=1684368000&v=beta&t=tvUv-AcC-wMmmy2vUcZVmpdF4Rix4dVdaKno9idgT1M',
    minibio: 'Senior Staff Software Engineer at OLX Brasil',
  }
]

function mostraMulheres(request, response) {
  response.json(listaDeMulheres)
}

app.use(router.get('/mulheres', mostraMulheres))

function mostraPorta() {
  console.log(`Servidor criado e rodando na porta ${PORTA}`)
}

app.listen(PORTA, mostraPorta)