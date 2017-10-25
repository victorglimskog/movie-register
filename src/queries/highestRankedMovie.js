const query = require('../query');

module.exports = async () => {
    const q = `
        SELECT year, title, total as totalScore
        FROM totalscores
        WHERE total =
            (SELECT MAX(total) FROM totalscores)
    `;
    result = await query(q);
    console.log('Highest ranked movies', result);
    return result;
};
