const query = require('../query');

module.exports = async () => {
    const q = `
        SELECT title, average as averagescore
        FROM averagescores
        WHERE average =
            (SELECT MIN(average) FROM averagescores)
    `;
    result = await query(q);
    console.log('Lowest ranked movies', result);
    return result;
};
