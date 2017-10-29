const query = require('../query');

module.exports = async function() {
    let actorsRating = `
        SELECT actorid, movieid, firstname, lastname, AVG(totalscores.total) as averagescore
        FROM actorsmovies
        JOIN actors ON (actors.id = actorsmovies.actorid)
        JOIN totalscores ON (totalscores.id = actorsmovies.movieid)
        GROUP BY actorid
        ORDER BY averagescore DESC
    `;

    return result = await query(actorsRating);
};
