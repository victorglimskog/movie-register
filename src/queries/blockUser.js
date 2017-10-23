const query = require('../query');

module.exports = async function(userId) {
    const tables = ['actors', 'descriptions', 'directors', 'reviews'];

    tables.forEach(async function (table) {
        let deleteEditsByUser = `
            DELETE FROM ${table}
            WHERE editorid = ?
        `;

        let result = await query(deleteEditsByUser, userId);
        console.log(result);
    });

    let addBlockRole = `
    `
};
