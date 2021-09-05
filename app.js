const express = require('express');
const app = express();
//porta.
// listen tem que ser a ultima linha do file de servidor.
app.listen(8081, () => {
    console.log("servidor rodando!");
});