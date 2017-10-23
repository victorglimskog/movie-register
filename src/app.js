require('dotenv').config();
const express = require('express');
const RestSql = require('./rest-sql.class');
const bodyParser = require('body-parser');
const session = require('express-session');
const createData = require('./createData');
const Loginhandler = require('./loginhandler.class');
const highestRankedMovie = require('./queries/highestRankedMovie');
const searchMovies = require('./queries/searchMovies');

const auth = require('./auth');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: '&*$@&($fehfj343dhfkh334445ksd{',
    resave: false,
    saveUninitialized: true,
}));

new Loginhandler(app);

// app.use(auth(req,res,next))

// kolla inlogg
// kolla url and req method
// send correct status code 403

app.use(RestSql.start({
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
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




createData();
highestRankedMovie();

// TO BE CONTINUED
// searchMovie("Return of the Mutant Zombies II");

