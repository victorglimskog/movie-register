const query = require('../query');

module.exports = async function(highestOrLowest) {
    let actorsRating;

    if (highestOrLowest === 'highest' || highestOrLowest === 'lowest') {
        let maxOrMin = highestOrLowest === 'highest' ? 'MAX' : 'MIN';

        actorsRating = `
            SELECT actorid, movieid, firstname, lastname, AVG(averagescores.average) as averagescore
            FROM actorsmovies
            JOIN actors ON (actors.id = actorsmovies.actorid)
            JOIN averagescores ON (averagescores.id = actorsmovies.movieid)
            GROUP BY actorid
            HAVING ${maxOrMin}(averagescore)
        `;
    } else if (highestOrLowest === undefined) {
        actorsRating = `
            SELECT actorid, movieid, firstname, lastname, AVG(averagescores.average) as averagescore
            FROM actorsmovies
            JOIN actors ON (actors.id = actorsmovies.actorid)
            JOIN averagescores ON (averagescores.id = actorsmovies.movieid)
            GROUP BY actorid
            ORDER BY averagescore DESC
        `;
    } else {
        throw new Error('The input to the function actorRating() is not a valid input!');
    }

    let result = await query(actorsRating);
    console.log(result);
    return result;
};
