require('./config');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const path=require('path')
const config=require('./config/password')
const destinationsRoutes=require('./routes/destinations')
const usersRoutes=require('./routes/users')
const viewsRoutes=require('./routes/views')
const morgan=require('morgan')
const hbs = require('hbs')
const hbsUtils = require('hbs-utils')(hbs);
const session = require('express-session')

hbs.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'))
app.use('/', express.static(path.join(__dirname,'public')))
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(router);
app.use(viewsRoutes)
app.use('/destinations',destinationsRoutes)
app.use('/users',usersRoutes)


app.listen(port, () => console.log('Servidor levantado en ' + port));