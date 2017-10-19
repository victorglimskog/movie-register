const express = require('express');
const RestSql = require('./rest-sql.class');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Authenticaton middleware
function auth(req, res, next) {
    if (req.session && req.session.user && req.session.user.username === 'vgl') {
        return next();
    }
    return res.sendStatus(401);
}

app.use(bodyParser.json());

app.use(session({
    secret: '&*$@&($fehfj343dhfkh334445ksd{',
    resave: false,
    saveUninitialized: true,
}));

app.post('/login', (req, res) => {
    if (req.body.username === 'vgl' && req.body.password === 'plastapa') {
        req.session.user = { username: req.body.username };
        res.status(200).json({ msg: 'Successfully logged in' });
    } else {
        res.status(401).json({ msg: 'Incorrect credentials' });
    }
});

app.use(RestSql.start({
    dbCredentials: {
        host: '127.0.0.1',
        user: 'root',
        password: 'ellavera',
        database: 'movieregister',
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
