const pm = require('promisemaker');
const mysql = require('mysql');

// Create a connection
const db = pm(
    mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }), {
        rejectOnErrors: false,
        mapArgsToProps: {
            query: ['rows', 'fields'],
        },
    }
);

async function query(queryStr, params) {
    const result = await db.query(queryStr, params);
    return result.rows;
}

module.exports = class Loginhandler {
    constructor(expressApp) {
        this.app = expressApp;
        // Run all the methods below to setup routes for our express app
        this.post();
        this.delete();
    }

    async credentialsCheck(req) {
        const uname = req.body.username;
        const pwd = req.body.password;

        const result = await query(
            `SELECT * FROM
            (SELECT users.id, GROUP_CONCAT(roles.name) AS roles
            FROM
                users, roles, usersroles
            WHERE
                users.id = usersroles.userid
            AND
                roles.id = usersroles.roleid
            AND
                users.username = ?
            AND
                users.password = ?
            GROUP BY users.id) AS subQ
            JOIN users ON subQ.id = users.id`,
            [uname, pwd]);

        result[0].roles = result[0].roles.split(',');
        return result;
    }

    delete() {
        this.app.delete('/login', (req, res) => {
            req.session.destroy();
            res.status(200).json({msg: 'Successfully logged out'});
        });
    }
    // clean password from userobject before resending
    async post() {
        this.app.post('/login', async (req, res) => {
            const result = await this.credentialsCheck(req);
            console.log();
            const userObj = {
                id: result[0].id,
                username: result[0].username,
                roles: result[0].roles,
            };
            if (result.length) {
                req.session.user = userObj;
                res.status(200).json({
                    msg: 'Successfully logged in user: ' + userObj.username + ' ♪☆＼(^０^＼) ♪(／^-^)／☆♪',
                    userObj: userObj,
                });
            } else {
                // Try to login
                res.status(401).json({msg: 'Incorrect credentials! (╯°□°)╯︵ slɐᴉʇuǝpǝɹɔ'});
            }
        });
    }
};
