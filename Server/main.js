const express = require('express');
let app = express();
let puerto = process.env.PORT || 3000;

const axios = require('axios');

const getpaises = async() => {

    const instance = axios.create({
        baseURL: `https://restcountries.eu/rest/v2/all`,
        headers: {}
    });
    const resp = await instance.get();
    return resp
}

// getpaises()
//     .then(console.log)
//     .catch(console.log);


app.listen(puerto, () => {
    console.log(`Escuchando por el puerto: ${puerto}`);
})