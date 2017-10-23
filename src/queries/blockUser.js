const query = require('../query');

module.exports = async function(userId) {
    const tables = ['actors', 'descriptions', 'directors', 'reviews'];

    this.tables.forEach((table, index) => {

        let findEditsByUser = `
            SELECT * FROM ${table}
                WHERE editorid = ?
            `;


        console.log("query", query);
        result = await query(findEditsByUser, userId);
        console.log(result);
    }
};
