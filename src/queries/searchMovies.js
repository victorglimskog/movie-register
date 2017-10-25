const query = require('../query');


/*
Get movies based on searching phrase

1. Sök sträng i movies.title (%movietitle%)
2. Har vi mindre än 5 resultat sök varje ord från sträng i actors.fname/lname
3. Har vi mindre än 5 resultat sök varje ord från sträng i movies.title
*/


module.exports = async function(string, limit) {
    console.log('searchstring: ', string);

    // Save all related data into those arrays
    let actors = [];
    let movies = [];

    // Look for movies with similar name
    movies = JSON.parse(JSON.stringify(await query('SELECT * FROM movies WHERE title LIKE "%' + string + '%" LIMIT 5')));

    console.log('movies result:', movies);

    // If we had less then 5 results in movieSecondPart
    // look if the string match anything in actors
    if (!movies.length || movies.length < limit) {
        // Split the string into words
        let words = string.split(' ');

        // Loop all words and look for the words in actors firstname + lastname

        for (key in words) {
            let word = words[key];
            let actor = await query('SELECT id FROM actors WHERE firstname LIKE "%' + word + '%" OR lastname LIKE "%' + word + '%" LIMIT 5');
            // Did we find any actor based on the query ?
            if (actor.length && actor.length > 0) {
                actors.push(actor)
            };
        }
        console.log('actors result: ', actors);
    }
    return movies;
};
