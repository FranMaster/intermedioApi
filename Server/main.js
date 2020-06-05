const express = require('express');
var bodyParser = require('body-parser')
const axios = require('axios');
let app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


let puerto = process.env.PORT || 3000;

const getpaises = async(cod, resdata) => {

    const instance = axios.create({
        baseURL: `https://restcountries.eu/rest/v2/name/${cod}`,
        headers: {}
    });
    const resp = await instance.get();
    console.log(resp);
    return resp.data;
}

app.get('/getCountries', (req, resp) => {
    let codigopais = req.query.cod;
    getpaises(codigopais)
        .then((resdata) => {
            resp.status(200).json({
                message: 'ok',
                data: resdata
            })
        })
        .catch(console.log);

})

app.post('/getCountries', (req, resp) => {
    if (!req.is('application/json')) {
        resp.status(400).json({
            message: 'Invalid Conten-type'
        });
    } else {
        if (req.body.firma === undefined) {
            resp.status(405).json({ message: 'error,firma requerida', data: null })
            return;
        }
        resp.status(200).json({
            message: 'Realizaste un POST',
            data: req.body.firma
        });
    }


})


app.listen(puerto, () => {
    console.log(`Escuchando por el puerto: ${puerto}`);
})