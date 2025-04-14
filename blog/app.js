require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 8080 || process.env.PORT;



app.use(express.static('public'));

//templating engine
app.use(expressLayout);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})