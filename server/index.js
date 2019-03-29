require('./config');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const hbs = require('hbs')
const hbsUtils = require('hbs-utils')(hbs);
hbs.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use(express.json());

app.use('/', express.static(`${__dirname}/public`))
app.use(router);
app.get('/hbs', (req, res) => {
    res.render('prueba.hbs', {
        title: 'Prueba',
        users: [{
                id: 1,
                name: 'David'
            },
            {
                id: 2,
                name: 'Pedro'
            },
            {
                id: 3,
                name: 'Jhon'
            },
            {
                id: 4,
                name: 'Steve'
            },
            {
                id: 5,
                name: 'Michael'
            },
        ],
        admin: {
            name: 'David',
            fullname: 'David Pinilla'
        },
        layout: 'template'
    });
});


app.listen(port, () => console.log('Servidor levantado en ' + port));