require('dotenv').config();
const express = require('express');
const RestSql = require('./rest-sql.class');
const bodyParser = require('body-parser');
const session = require('express-session');
const createData = require('./createData');
const Loginhandler = require('./loginhandler.class');
const highestRankedMovie = require('./queries/highestRankedMovie');

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

// Get movies based on searching phrase
async function searchMovie(string) {
    // Look for movies with similar name
    let movies = await query('SELECT * FROM movies WHERE title LIKE "%' + string + '%"');

    // If we had less then 5 results in movieSecondPart
    // look if the string match anything in actors
    if (movies.length && movies.length < 5 || !movies.length) {
        // how all words from the input string
        let words = string.split(' ');
        if (words.length == 2) {
            let stringName1 = words[0];
            let stringName2 = words[0];
            let actorsFirstSearch = await query('SELECT * FROM actors WHERE firstname LIKE "%' + stringName1 + '%" OR lastname LIKE "%' + stringName2 + '%" LIMIT 5');

            if (movies.length && movies.length < 5 || !movies.length) {
                let actorsSecondSearch = await query('SELECT * FROM actors WHERE firstname LIKE "%' + stringName2 + '%" OR lastname LIKE "%' + stringName1 + '%" LIMIT 5');
            }
        }
    }
    // LIMIT 5? of movies, movies of actorsFirstSearch, movies of actorsSecondSearch,
    return movies;
}

createData();
highestRankedMovie();

// TO BE CONTINUED
// searchMovie("Return of the Mutant Zombies II");

// createDummyData();
