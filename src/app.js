const express = require('express');
const RestSql = require('./rest-sql.class');
const bodyParser = require('body-parser');
const session = require('express-session');
const Loginhandler = require('./loginhandler.class');

const auth = require('./auth');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: '&*$@&($fehfj343dhfkh334445ksd{',
    resave: false,
    saveUninitialized: true,
}));

new Loginhandler(app);

app.use(RestSql.start({
    dbCredentials: {
        host: '127.0.0.1',
        user: 'root',
        password: 'myskul',
        database: 'movieregister2',
    },
    baseUrl: '/restapi',
    idMap: {},
    runtimeErrors: false,
}));

app.get('/secretData', auth, (req, res) => res.status(200).send('Welcome, you are now logged in'));

app.use(express.static('./www'));

app.listen(3000, () => {
    console.log('Up and running at Tannhäuser Gate 3k');
});
