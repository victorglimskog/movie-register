const query = require('../query');

module.exports = async function(activity) {
    let order = activity !== 'leastActive' ? 'ASC' : 'DESC';

    let selectGroupBy = `
        SELECT actorid, firstname, lastname, COUNT(movieid) AS moviesActedIn
        FROM actorsmovies
        JOIN actors ON (actors.id = actorsmovies.actorid)
        GROUP BY actorid
        ORDER BY moviesActedIn ${order}
    `;

    let result = await query(selectGroupBy);
    console.log(result);
};
