const query = require('../query');


/*
** 	Get movies based on searching phrase
**
**	1. Sök sträng i movies.title (%movietitle%)
**	2. Har vi mindre än 5 resultat sök varje ord från sträng i actors.fname/lname
**	3. Har vi mindre än 5 resultat sök varje ord från sträng i movies.title
**
*/


module.exports = async function(string, limit) {
    //console.log('searchstring: ', string);
	if(!limit){limit=9999999}

    // Save all related data into those arrays
    let actors = [];
    let movies = [];
    let moviesFromActors = [];
	let returnMovies = [];

    // Look for movies with similar name
	// Transform movies as a collection to an object
    movies = JSON.parse(JSON.stringify(await query('SELECT * FROM movies WHERE title LIKE "%' + string + '%" LIMIT 5')));

    

    // If we had less then 5 results in movieSecondPart
    // look if the string match anything in actors
    if (!movies.length || movies.length < limit) {
        // Split the string into words
        let words = string.split(' ');

        // Loop all words and look for the words in actors firstname + lastname
        for (key in words) {
            let word = words[key];
            let actor = JSON.parse(JSON.stringify(await query('SELECT id FROM actors WHERE firstname LIKE "%' + word + '%" OR lastname LIKE "%' + word + '%" LIMIT 5')));
            // Did we find any actor based on the query ?
            if (actor.length && actor.length > 0) {
                actors.push(actor)
            };
        }
	
		// Get movies by actor Id
		actors = actors[0]
		if(actors && actors.length > 0){
			for (key in actors) {
				let actorId = actors[key].id
				//console.log("> actorId: ", actorId)
				
				// Get movieIds by actorId
				let movieIds = JSON.parse(JSON.stringify(await query('SELECT movieid FROM actorsmovies WHERE actorid = "'+actorId+'"')));
				//console.log("> movieIds: ", movieIds)
				
				// Get movies by movieId 
				if(movieIds && movieIds.length > 0){
					for (key in movieIds) {
						let movieId = movieIds[key].movieid;
						//console.log("> movieId: ", movieId);
						
						// Get movie by movieid
						let movie = JSON.parse(JSON.stringify(await query('SELECT * FROM movies WHERE id = "'+movieId+'"')));
						moviesFromActors.push(movie[0]);
					}
				}	
			}
		} 
		
        
    }
	
	// Loop movies and add all to returnMovies
	if(movies){
		for (key in movies) {
			if(returnMovies.length < limit){
				let movie = movies[key];
				returnMovies.push(movie);	
			}else{break;}
			
		}
	}
	
	// Loop moviesFromActors and add all to returnMovies
	if(moviesFromActors){
		for (key in moviesFromActors) {
			if(returnMovies.length < limit){
				let movie = moviesFromActors[key];
				returnMovies.push(movie);	
			}else{break;}
			
		}
	}
	
	console.log("returnMovies: ", returnMovies);
    return returnMovies;
};
