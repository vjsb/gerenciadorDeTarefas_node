const express = require ('express');
const app = express();
app.use(express.json());
let lembretes = {};
let contador = 0;

//https://localhost:porta/lembretes
app.get('/lembretes', (req, res)=> {
    res.send(lembretes);
})

app.put('/lembretes', (req, res) => {
    contador++; //autoincrement do contador para fazer a lista
    const { texto } = req.body; //corpo da requisição
    lembretes[contador] = { //em lembretes na posição contador ira guardar o cotador e o texto
        contador, texto
    }
    res.status(201).send(lembretes[contador]); //com isso sera inserido um novo registro
} )

app.listen(4000, () => {
    console.log("Lembretes:4000.");
});