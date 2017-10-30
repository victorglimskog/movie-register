const query = require('../query');

module.exports = async () => {
    const q = `
        SELECT title, average as averagescore
        FROM averagescores
        WHERE average =
            (SELECT MAX(average) FROM averagescores)
    `;
    result = await query(q);
    console.log('Highest ranked movies', result);
    return result;
};
