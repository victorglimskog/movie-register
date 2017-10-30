const query = require('../query');

module.exports = async function(mostOrLeast = null) {
    let actorsActivity;

    if (mostOrLeast === 'most' || mostOrLeast === 'least') {
        let maxOrMin = mostOrLeast === 'most' ? 'MAX' : 'MIN';

        actorsActivity = `
            SELECT actorid, firstname, lastname, moviesActedIn
            FROM totalmoviesactedin
            WHERE moviesActedIn =
                (SELECT ${maxOrMin}(moviesActedIn) FROM totalmoviesactedin)
        `;
    } else if (mostOrLeast === null) {
        actorsActivity = `
            SELECT actorid, firstname, lastname, COUNT(movieid) AS moviesActedIn
            FROM actorsmovies
            JOIN actors ON (actors.id = actorsmovies.actorid)
            GROUP BY actorid
            ORDER BY moviesActedIn DESC
        `;
    } else {
        throw new Error('The input to the function actorActivity() is not a valid input!');
    }

    let result = await query(actorsActivity);
    console.log(result);
    return result;
};
