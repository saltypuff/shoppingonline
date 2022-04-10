import morgan from 'morgan';
import { engine } from 'express-handlebars'
import express from 'express';
import numeral from 'numeral';
import adminRoute from './routes/admin-route.js';
import clientRoute from './routes/client-route.js';
import customerRoute from './routes/customer-route.js';
import driverRoute from './routes/driver-route.js';
import mainRoute from './routes/main-route.js';
import session from 'express-session';
import auth from './middlewares/auth.js'

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.engine('hbs', engine({
    helpers: {
        format_number(val) {
            return numeral(val).format('0, 0');
        },
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use('/public', express.static('public'));
app.set('trust proxy', 1);
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { }
}));

app.use(async function (req, res, next) {
    if (typeof (req.session.auth) === 'undefined') 
        req.session.auth = false;
    next();
});

app.use('/admin', auth, adminRoute);
app.use('/client', auth, clientRoute);
app.use('/customer', auth, customerRoute);
app.use('/driver', auth, driverRoute);
app.use('/', mainRoute);


const port = 3000;
app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`);
});