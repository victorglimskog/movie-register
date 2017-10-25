const query = require('../query');

module.exports = async () => {
    const q = `
        SELECT year, title, total as totalScore
        FROM totalscores
        WHERE total =
            (SELECT MIN(total) FROM totalscores)
    `;
    result = await query(q);
    console.log('Lowest ranked movies', result);
    return result;
};
