const express = require('express');
// serve para enviar eventos para os demais microserviços
//axios é o que fala ajax que é uma biblioteca do javaScript para fazer requisições
const axios = require('axios');

const app = express();
app.use(express.json());

//adicionar a ambos microserviços de lembretes e observações
app.post('/eventos', (req, res) => {
    const evento = req.body;
    //envia o evento para o microserviço de lembretes
    axios.post('http://localhost:4000/eventos', evento);
    // envia o evento para o microserviço de observações
    axios.post('http://localhost:5000/eventos', evento);
    res.status(200).send({ msg : "ok"}); //json msg com o conteudo "ok"
    // envia o evento para o microserviço de conulta
    axios.post("http://localhost:6000/eventos", evento);
});

app.listen(10000, () => {
    console.log('Barramento de eventos: porta 10000');
}) 