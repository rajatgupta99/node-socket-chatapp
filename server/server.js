const path = require('path');
const express = require('express');

var app = express();
var publicPath = path.join(__dirname, '..', '/public');
var PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(PORT, () =>  {
    console.log(`Listening on PORT: ${PORT}`);
})
