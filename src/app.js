require('dotenv').config();
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

async function query(query, params) {
    const result = await RestSql.db.query(query, params);
    return result.rows;
}

let firstNames = [
    'Anna',
    'Charlie',
    'Harrison',
    'Julia',
    'Mark',
    'Denise',
    'Gabriella',
    'Morgan',
    'Marie',
    'Claude',
];

let lastNames = [
    'Ford',
    'Skarsgård',
    'Roberts',
    'Anderson',
    'Freeman',
    'Lobe',
    'Henricson',
    'Bergman',
    'Hamilton',
    'Janson',
];

let movieFirstPart = [
    'Attack of the',
    'Return of the',
    'Back to the',
    'The remains of the',
];

let movieSecondPart = [
    'Giant',
    'Mutant',
    'Teenage',
    'Space',
    'College',
];

let movieLastPart = [
    'Snails',
    'Snakes',
    'Sharks',
    'Monsters',
    'Vampires',
    'Zombies',
    'Pizzas',
];

let movieNum = ['', 'II', 'III', 'IV'];
let years = [1970, 1981, 1995, 2003, 2014, 2015, 2016];
let scores = ['1', '2', '3', '4', '5'];

// 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ' + randomItem(createdMovies).title + '.',
let reviews = [
    'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.',
    'Crap! Would never see if I knew.',
    '10/10, would netflix and chill again!',
];

let descriptions = [
    'The world has changed a lot, almost everything is going down the shitters.',
    'A lonely person that suddenly finds love.',
    'After the death of his father, the King of Denmark, returns home to the isolated, technologically advanced Skåne nation to succeed to the throne and take his rightful place as king.',
    'Bodies are turning up around the city, each having met a uniquely gruesome demise. As the investigation proceeds, evidence points to one suspect.'
];

let roles = [
    'blocked',
    'user',
    'admin',
];

let users = [
    {
        username: 'admin',
        email: 'admin@movieregister.com',
        password: '1234',
    },
    {
        username: 'user1',
        email: 'user1@movieregister.com',
        password: '1234',
    },
    {
        username: 'user2',
        email: 'user2@movieregister.com',
        password: '1234',
    },
    {
        username: 'user3',
        email: 'user3@movieregister.com',
        password: '1234',
    },
    {
        username: 'blockedUser',
        email: 'blockedUser@movieregister.com',
        password: '1234',
    },
];

let createdMovies = [];

function randomItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function createMovie() {
    return {
        title: [
            randomItem(movieFirstPart),
            randomItem(movieSecondPart),
            randomItem(movieLastPart),
            randomItem(movieNum),
        ].join(' '),
        year: randomItem(years),
    };
}

function createPerson() {
    return {
        firstname: randomItem(firstNames),
        lastname: randomItem(lastNames),
    };
}

async function deleteDummyData() {
    await query('DELETE FROM actors');
    await query('DELETE FROM directors');
    await query('DELETE FROM movies');
    await query('DELETE FROM reviews');
    await query('DELETE FROM roles');
    await query('DELETE FROM users');
}

async function createDummyData() {
    await deleteDummyData();

    // add users
    for (let i = 0; i < users.length; i++) {
        let user = createPerson();

        user.username = users[i].username;
        user.email = users[i].email;
        user.password = users[i].password;

        await query('INSERT INTO users SET ?', user);
    }

    // add roles
    for (let i = 0; i < roles.length; i++) {
        let role = {name: roles[i]};

        await query('INSERT INTO roles SET ?', role);
    }

    // get all userIds
    let userIds = (await query('SELECT id FROM users WHERE username <> "admin"')).map((x)=>x.id);

    let adminIds = (await query('SELECT id FROM users WHERE username = "admin"')).map((x)=>x.id);
    let blockedIds = (await query('SELECT id FROM users WHERE username = "blockedUser"')).map((x)=>x.id);

    let roleBlockedId = (await query('SELECT id FROM roles WHERE name = "blocked"')).map((x)=>x.id);
    let roleUserId = (await query('SELECT id FROM roles WHERE name = "user"')).map((x)=>x.id);
    let roleAdminId = (await query('SELECT id FROM roles WHERE name = "admin"')).map((x)=>x.id);

    // add 100 actors
    for (let i = 0; i < 50; i++) {
        let actor = createPerson();
        actor.id = i + 1;
        actor.vnumber = 1;
        actor.editorid = randomItem(userIds);

        await query('INSERT INTO actors SET ?', actor);
    }
    // add 10 directors
    for (let i = 0; i < 10; i++) {
        let director = createPerson();
        director.id = i + 1;
        director.vnumber = 1;
        director.editorid = randomItem(userIds);

        await query('INSERT INTO directors SET ?', director);
    }
    // add 20 movies
    for (let i = 0; i < 20; i++) {
        let newMovie = createMovie();

        createdMovies.push(newMovie);

        await query('INSERT INTO movies SET ?', newMovie);
    }


    // get all movieIds
    let movieIds = (await query('SELECT id FROM movies')).map((x)=>x.id);

    // get all actorIds
    let actorIds = (await query('SELECT id FROM actors')).map((x)=>x.id);

    // get all directorIds
    let directorsIds = (await query('SELECT id FROM directors')).map((x)=>x.id);

    // give role to users
    for (let userId of userIds) {
        await query('INSERT INTO usersroles SET ? ', {
            userid: userId,
            roleid: roleUserId,
        });
    }

    // give role to admins
    for (let adminId of adminIds) {
        await query('INSERT INTO usersroles SET ? ', {
            userid: adminId,
            roleid: roleAdminId,
        });
    }

    // give role to blocked users
    for (let blockedId of blockedIds) {
        await query('INSERT INTO usersroles SET ? ', {
            userid: blockedId,
            roleid: roleBlockedId,
        });
    }

    // generate one description per movie
    for (let movieId of movieIds) {
        await query('INSERT INTO descriptions SET ? ', {
            movieid: movieId,
            vnumber: 1,
            text: randomItem(descriptions),
            editorid: randomItem(userIds),
        });
    }

    // generate one director per movie
    for (let movieId of movieIds) {
        await query('INSERT INTO directorsmovies SET ? ', {
            directorId: randomItem(directorsIds),
            movieId: movieId,
        });
    }

    // generate 3 to 5 actors per movie
    for (let movieId of movieIds) {
        let actorIdsUsed = {};
        for (i = 0; i < 3 + Math.floor(Math.random()*3); i++) {
            let actorId;
            do {
                actorId = randomItem(actorIds);
            } while (!actorId || actorIdsUsed[actorId]);
            actorIdsUsed[actorId] = true;
            await query('INSERT INTO actorsmovies SET ? ', {
                actorId: actorId,
                movieId: movieId,
            });
        }
    }

    // generate 2 to 4 reviews per movie
    for (let movieId of movieIds) {
        for (i = 0; i < 2 + Math.floor(Math.random()*2); i++) {
            let review = {};
            review.text = randomItem(reviews);
            review.score = randomItem(scores);
            review.editorid = randomItem(userIds);
            review.movieid = randomItem(movieIds);

            await query('INSERT INTO reviews SET ? ', review);
        }
    }

    process.exit();
}

// createDummyData();
