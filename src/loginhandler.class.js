const pm = require('promisemaker');
const mysql = require('mysql');

// Create a connection
const db = pm(
    mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "myskul",
        database: "movieregister2"
    }),
    {
        rejectOnErrors: false,
        mapArgsToProps: {
            query: ["rows", "fields"]
        }
    }
);

async function query(queryStr,params) {
    const result = await db.query(queryStr,params);
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

        console.log(uname, pwd);

        const result = await query('SELECT * FROM users WHERE username = ? AND password = ?',[uname, pwd]);
        console.log(result);
        if (!result.length){
            return false;
        } else {
            return true;
        }
    }

    delete() {
        this.app.delete('/login', (req, res) => {
            req.session.destroy();
            res.status(200).json({ msg: 'Successfully logged out' });
        });
    }

    async post() {
        this.app.post('/login', async (req, res) => {
            if (await this.credentialsCheck(req)) {
                req.session.user = { username: req.body.username };
                res.status(200).json({ msg: 'Successfully logged in' });
            } else {
                // Try to login
                res.status(401).json({ msg: 'Incorrect credentials' });
            }
        });
    }
};
