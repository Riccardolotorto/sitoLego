var express = require('express');
const lego = require('./lego.json'); //Copia il file people.json dentro la variabile people
var app = express();
app.set('view engine', 'pug'); //Dico a express di usare pug come motore di template
app.use(express.static(__dirname + '/public')); // Dico ad express dove recuperare i file statici

app.get('/', function (req, res) {
    //res.send('Ciao Mondo');
    res.render('index', {
        title: 'Homepage',
        lego: lego.products //Passa il vettore profiles alla pagina index.pug
        }); //Dico a express di processare e inviare la pagina index.pug con due variabili (title e people)
});

app.get('/istruzioni', (req, res) => {
    const product = lego.products.find((p) => p.id === req.query.id);  //Viene individuata la persona con l’id specificato nell’url. Con req.query otterremo {name:"tom", age: "55"} 
    //find(p => p.id === req.query.id) Il controllo viene fatto su tutte le persone del vettore. Se una persona ha id uguale a quello specificato nell’url il metodo find restituisce la persona individuata
    res.render('istruzioni', {
        title: `Istruzioni LEGO: ${product.title}`, //A questo punto renderizzeremo la pagina pug profile passando i dati che ci interessano (in questo caso il titolo e i dati sulla persona)
        product,
    });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
