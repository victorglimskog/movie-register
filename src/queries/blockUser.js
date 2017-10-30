const query = require('../query');

module.exports = async function(userId) {

    if (userId === undefined) {
        throw new Error("You need to specify the id of the user that you wan't to block");
    }

    const tables = ['actors', 'descriptions', 'directors', 'reviews'];

    tables.forEach(async function(table) {
        let deleteEditsByUser = `
            DELETE FROM ${table}
            WHERE editorid = ?
        `;

        let result = await query(deleteEditsByUser, userId);
        console.log(result);
    });

    let addBlockRole = `
        INSERT INTO usersroles (userid, roleid) VALUES (?, '1');
    `;

    let result = await query(addBlockRole, userId);
    console.log(result);
    console.log(`Edits by user ${userId} has now been removed and the user is set as blocked`);
};
