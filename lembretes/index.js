const express = require ('express');
const axios = require('axios');
const app = express();
app.use(express.json());
let lembretes = {};
let contador = 0;

//https://localhost:porta/lembretes
app.get('/lembretes', (req, res)=> {
    res.send(lembretes);
})

//async é de assincrono, isso faz dela uma chamada assincrona, ou seja não espere pelo retorno
app.put('/lembretes', async (req, res) => {
    contador++; //autoincrement do contador para fazer a lista
    const { texto } = req.body; //corpo da requisição
    lembretes[contador] = { //em lembretes na posição contador ira guardar o cotador e o texto
        contador, texto
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado", 
        dados: {
            contador,
            texto,
        },
    })
    res.status(201).send(lembretes[contador]); //com isso sera inserido um novo registro 
} )

app.listen(4000, () => {
    console.log("Lembretes:4000.");
});