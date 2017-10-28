require('dotenv').config();
const express = require('express');
const RestSql = require('./rest-sql.class');
const bodyParser = require('body-parser');
const session = require('express-session');
const Loginhandler = require('./auth/loginhandler.class');
const createData = require('./createData');

// queries
const highestRankedMovie = require('./queries/highestRankedMovie');
const lowestRankedMovie = require('./queries/lowestRankedMovie');
const searchMovies = require('./queries/searchMovies');
const blockUser = require('./queries/blockUser');
const actorActivity = require('./queries/actorActivity');

const auth = require('./auth/auth');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: '&*$@&($fehfj343dhfkh334445ksd{',
    resave: false,
    saveUninitialized: true,
}));

new Loginhandler(app);

app.use(auth);

app.use(RestSql.start({
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
    baseUrl: '/restapi',
    idMap: {
        descriptions: 'movieid',
    },
    runtimeErrors: false,
}));

app.use(express.static('./www'));

app.listen(3000, () => {
    console.log('Server is running on... ╰( ͡° ͜ʖ ͡° )── PORT: 3000');
});

// createData();
// highestRankedMovie();
// lowestRankedMovie();
// blockUser(userToBlockId);
// searchMovies("harrison", 5);   // searchstring / callback limit of movies 
// actorActivity(); // takes inparams 'most' or 'least' for most active actors and least avtive actors, if no inparams you get them all in order of activity
