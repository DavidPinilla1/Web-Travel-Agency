require('./config');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const destinationsRoutes=require('./routes/destinations')
const viewsRoutes=require('./routes/views')
const morgan=require('morgan')
const hbs = require('hbs')
const hbsUtils = require('hbs-utils')(hbs);
hbs.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use(express.json());
app.use(morgan('tiny'))
app.use('/', express.static(`${__dirname}/public`))
app.use(router);
app.use(viewsRoutes)
app.use('/destinations',destinationsRoutes)


app.listen(port, () => console.log('Servidor levantado en ' + port));