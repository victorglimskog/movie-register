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

    let words = string.split(' ');

    // Look for movies with similar name 
    let movies = await query('SELECT * FROM movies WHERE title LIKE "%'+string+'%" LIMIT 5');
	
    console.log(movies);
	
    // If we had less then 5 results in movieSecondPart
	// look if the string match anything in actors
    if(movies.length && movies.length < 5 || !movies.length){
		
        // how many words from the input string
        // Loop all words and look for the words in actors firstname + lastname
		let actors = [];
        for(word in words){
            word = words[word];
            let actor = await query('SELECT id FROM actors WHERE firstname LIKE "%'+word+'%" OR lastname LIKE "%'+word+'%" LIMIT 5');
			if(actor){actors.push(actor)};
        }
		
		console.log("actors", actors);

		/*
        // if two words, its probably "firstname lastname"
		if(words.length == 2){
			let stringName1 = words[0];
			let stringName2 = words[1];
			let actorsFirstSearch = await query('SELECT * FROM actors WHERE firstname LIKE "%'+stringName1+'%" OR lastname LIKE "%'+stringName2+'%" LIMIT 5');

			// Reversed: Name is probably backwards "lastname firstname"
			if(actorsFirstSearch.length && actorsFirstSearch.length < 5 || !movies.length){
				let actorsSecondSearch = await query('SELECT * FROM actors WHERE firstname LIKE "%'+stringName2+'%" OR lastname LIKE "%'+stringName1+'%" LIMIT 5');	
			}
		}
		*/
		
	}

    // LIMIT 5? of 1. movies, 2. movies of actorsFirstSearch, 3. movies of actorsSecondSearch,
	
    return movies;
}

createData();
highestRankedMovie();

// TO BE CONTINUED
// searchMovie("Return of the Mutant Zombies II");

