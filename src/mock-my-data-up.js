/* eslint-disable */
let firstNames = [
    "Anna",
    "Charlie",
    "Harrison",
    "Julia",
    "Mark",
    "Denise",
    "Gabriella",
    "Morgan",
    "Marie",
    "Claude",
];

let lastNames = [
    "Ford",
    "Skarsgård",
    "Roberts",
    "Anderson",
    "Freeman",
    "Lobe",
    "Henricson",
    "Bergman",
    "Hamilton",
    "Janson",
];

let movieFirstPart = [
    "Attack of the",
    "Return of the",
    "Back to the",
    "The remains of the"
]

let movieSecondPart = [
    "Giant",
    "Mutant",
    "Teenage",
    "Space",
    "College"
];
let movieLastPart = [
    "Snails",
    "Snakes",
    "Sharks",
    "Monsters",
    "Vampires",
    "Zombies",
    "Pizzas"
];
let movieNum = ["","II","III","IV"];
let years = [1970,1981,1995,2003,2014,2015,2016];
let scores = ['1','2','3','4','5'];

let reviews = [
    'The world has changed a lot, almost everything is going down the shitters. Just like the movie ' + randomItem(createdMovies).title + '.',
    'Crap! Would never see if I knew.',
    '10/10, would netflix and chill again!'
]

let descriptions = [
    'The world has changed a lot, almost everything is going down the shitters.',
    'A lonely person that suddenly finds love.',
    'After the death of his father, the King of Denmark, returns home to the isolated, technologically advanced Skåne nation to succeed to the throne and take his rightful place as king.',
    'Bodies are turning up around the city, each having met a uniquely gruesome demise. As the investigation proceeds, evidence points to one suspect.'
];

let users = [
    {
        username: 'admin',
        email: 'admin@movieregister.com',
        password: '1234'
    },
    {
        username: 'user1',
        email: 'user1@movieregister.com',
        password: '1234'
    },
    {
        username: 'user2',
        email: 'user2@movieregister.com',
        password: '1234'
    },
    {
        username: 'user3',
        email: 'user3@movieregister.com',
        password: '1234'
    },
    {
        username: 'blockedUser',
        email: 'blockedUser@movieregister.com',
        password: '1234'
    }
]

let createdMovies = [];

function randomItem(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function createMovie(){
    return {
        title: [
            randomItem(movieFirstPart),
            randomItem(movieSecondPart),
            randomItem(movieLastPart),
            randomItem(movieNum)
        ].join(' '),
        year: randomItem(years),
    }
}

function createPerson(){
    return {
        firstname: randomItem(firstNames),
        lastname: randomItem(lastNames),
    }
}

async function deleteDummyData(){
    await query('DELETE FROM directorsmovies');
    await query('DELETE FROM actorsmovies');
    await query('DELETE FROM reviews');
    await query('DELETE FROM actors');
    await query('DELETE FROM directors');
    await query('DELETE FROM movies');
}

async function createDummyData(){
    await deleteDummyData();

    // add users
    for(let i = 0; i < users.length; i++){

        let user = createPerson();

        user.username = users[i].username;
        user.email = users[i].email;
        user.password = users[i].password;

        await query('INSERT INTO users SET ?',user);
    }

    // add 100 actors
    for(let i = 0; i < 50; i++){
        let actor = createPerson();
        actor.id = i + 1;
        actor.vnumber = 1;
        await query('INSERT INTO actors SET ?',actor);
    }
    // add 10 directors
    for(let i = 0; i < 10; i++){
        let director = createPerson();
        director.lastname += '-Director';
        director.id = i + 1;
        director.vnumber = 1;
        await query('INSERT INTO directors SET ?',director);
    }
    // add 20 movies
    for(let i = 0; i < 20; i++){
        let newMovie = createMovie();

        createdMovies.push(newMovie);

        await query('INSERT INTO movies SET ?',newMovie);
    }

    // get all userIds
    let userIds = (await query('SELECT id, username FROM users WHERE username <> "admin"')).map((x)=>x.id);

    let adminIds = (await query('SELECT id, username FROM users WHERE username = "admin"')).map((x)=>x.id);
    let blockedIds = (await query('SELECT id, username FROM users WHERE username = "blockedUser"')).map((x)=>x.id);

    let roleBlockedId = (await query('SELECT id, name FROM users WHERE name = "blocked"')).map((x)=>x.id);
    let roleUserId = (await query('SELECT id, name FROM users WHERE name = "user"')).map((x)=>x.id);
    let roleAdminId = (await query('SELECT id, name FROM users WHERE name = "admin"')).map((x)=>x.id);

    // get all movieIds
    let movieIds = (await query('SELECT id FROM movies')).map((x)=>x.id);

    // get all actorIds
    let actorIds = (await query('SELECT id FROM actors')).map((x)=>x.id);

    // get all directorIds
    let directorsIds = (await query('SELECT id FROM directors')).map((x)=>x.id);

    // generate one director per movie
    for(let movieId of movieIds){
        await query('INSERT INTO directorsmovies SET ? ',{
            directorId: randomItem(directorsIds),
            movieId: movieId
        });
    }

    // give role to users
    for(let userId of userIds){
        await query('INSERT INTO usersroles SET ? ',{
            userid: userId,
            roleid: roleUserId
        });
    }

    // give role to admins
    for(let adminId of adminIds){
        await query('INSERT INTO usersroles SET ? ',{
            userid: adminId,
            roleid: roleAdminId
        });
    }

    // give role to blocked users
    for(let blockedId of blockedIds){
        await query('INSERT INTO usersroles SET ? ',{
            userid: blockedId,
            roleid: roleBlockedId
        });
    }

    // generate one description per movie
    for(let movieId of movieIds){
        await query('INSERT INTO descriptions SET ? ',{
            movieid: movieId,
            vnumber: 1,
            text: randomItem(descriptions),
            editorid: randomItem(usersIds)
        });
    }

    // generate three to five actors per movie
    for(let movieId of movieIds){
        let actorIdsUsed = {};
        for(i = 0; i < 3 + Math.floor(Math.random()*3); i++){
            let actorId;
            do {
                actorId = randomItem(actorIds);
            } while(!actorId || actorIdsUsed[actorId]);
            actorIdsUsed[actorId] = true;
            await query('INSERT INTO actorsmovies SET ? ',{
                actorId: actorId,
                movieId: movieId
            });
        }
    }

    // generate 2 to 4 reviews per movie
    for(let movieId of movieIds){
        for(i = 0; i < 2 + Math.floor(Math.random()*2); i++){
            let review = {};
            review.text = randomItem(reviews);
            review.score = randomItem(scores);
            review.editorid = randomItem(userIds);
            review.movieid = randomItem(movieIds);

            await query('INSERT INTO reviews SET ? ',review);
        }
    }

    // generate five - ten reviews per movie
    for(let movieId of movieIds){
        let reviewSourcesUsed = {};
        for(i = 0; i < 5 + Math.floor(Math.random()*6); i++){
            let reviewSource;
            do {
                reviewSource = randomItem(reviewSources);
            } while(!reviewSource || reviewSourcesUsed[reviewSource]);
            reviewSourcesUsed[reviewSource] = true;
            let reviewer = createPerson();
            reviewer = reviewer.firstname + ' ' + reviewer.lastname + '-Reviewer';
            await query('INSERT INTO reviews SET ? ',{
                movieId: movieId,
                source: reviewSource,
                author:  reviewer,
                link: reviewSource.toLowerCase().replace(/ /g,'') + '.com',
                score: Math.round(Math.random()*5 + .5)
            });
        }
    }

    process.exit();
}

createDummyData();