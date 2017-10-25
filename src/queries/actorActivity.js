const query = require('../query');

module.exports = async function(activity) {

    tables.forEach(async function (table) {
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
};
