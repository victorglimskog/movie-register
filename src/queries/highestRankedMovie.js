const query = require('../query');

module.exports = async function() {
    const question = `
        SELECT * FROM movies
        LIMIT 1
    `;
    result = await query(question);
    console.log('Highest ranked movies', result);
};
