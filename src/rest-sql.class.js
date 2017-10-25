const pm = require('promisemaker');
const mysql = require('mysql');

module.exports = class RestSql {
    static start(settings) {
        this.settings = settings;
        this.connectToSql();
        return (...args) => new RestSql(...args);
    }

    static connectToSql() {
        this.db = pm(
            mysql.createConnection(this.settings.dbCredentials),
            {
                rejectOnErrors: this.settings.runtimeErrors,
                mapArgsToProps: {
                    query: ['rows', 'fields'],
                },
            },
        );

        if (this.settings.runtimeErrors) {
            // if runetime error
            console.log('Error: ', this.settings.runtimeErrors);
        }
    }

    async query(q, params) {
        const result = await RestSql.db.query(q, params);
        return result.rows;
    }

    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.settings = RestSql.settings;

        if (this.settings.baseUrl.substr(-1) !== '/') {
            this.settings.baseUrl += '/';
        }

        this.analyseUrl();

        if (['get', 'post', 'put', 'delete'].includes(this.method)) {
            this[this.method]();
        }
    }

    analyseUrl() {
        const url = this.req.url;
        const method = this.req.method.toLowerCase();
        const baseUrl = this.settings.baseUrl;

        if (url.indexOf(baseUrl) !== 0) {
            this.next();
            return;
        }

        const urlParts = url.split(baseUrl, 2)[1].split('/');
        this.table = urlParts[0].split(';').join('');
        this.id = urlParts[1];
        this.method = method;
        this.idColName = this.settings.idMap[this.table] || 'id';
    }
<<<<<<< HEAD
=======

>>>>>>> 717e8fbcb4ddf5162b433ed1b87858c211bc77ea
    async get() {
        // Query with or without ID
        let result = await this.query(
            'SELECT * FROM `' + this.table + '`' + (this.id ? ' WHERE ' + this.title + ' =?' : ''),
            [this.id]
        );

        // If error
        if (result.constructor === Error) {
            this.res.status(500);
        } else if (this.id && result.length === 0) {
            this.res.status(500);
            return;
        } else if (this.id) {
            result = result[0];
        }
        this.res.json(result);
    }


    async post() {
        let result;

<<<<<<< HEAD
        // tables with versions
        if (this.table == 'descriptions' || this.table == 'directors' || this.table == 'actors') {
=======
        //tables with versions
        if (this.table == "descriptions" || this.table == "directors" || this.table == "actors") {
>>>>>>> 717e8fbcb4ddf5162b433ed1b87858c211bc77ea
            this.req.body.movieid ? this.id = this.req.body.movieid : {};
            // if there is an id, its an update of an post
            if (this.id) {
                let post = (await this.query(`SELECT * FROM ${this.table} WHERE ${this.idColName} = ${this.id}`))[0];

                delete post.movieid;
                delete post.vnumber;
                delete post.timestamp;

                let props = Object.assign({}, post, this.req.body);
                let keys = Object.keys(props);
                let vals = Object.values(props);

                let query = `INSERT INTO ${this.table} SET
                    vnumber = IFNULL((SELECT MAX(vnumber) + 1 FROM ${this.table} AS ac WHERE ${this.idColName} = ${this.id}), 1)`;

                for (let key of keys) {
                    query += `, ${key} = ?`;
                }

                result = await this.query(query, vals);
            } else {
                // if not, make an auto-incremented id and version number 1
                result = await this.query(`INSERT INTO ${this.table} SET
                   id = IFNULL((SELECT MAX(id) + 1 FROM ${this.table} AS tb), 1),
                   vnumber = 1,
                   ?`,
                this.req.body,
                );
            }
        } else {
            let query = 'INSERT INTO ' + '`' + this.table + '` SET ? ';
            // Log the query in the console before we run it
            console.log('query', query, [this.req.body, this.id]);
            // run query with or without id
            result = await this.query(query, [this.req.body, this.id]);
            // If we get an error from MySQL
<<<<<<< HEAD
            if (result.constructor === Error) {
                this.res.status(500);
=======
            if (result.constructor === Error){
            this.res.status(500);
>>>>>>> 717e8fbcb4ddf5162b433ed1b87858c211bc77ea
            }
        }
        // return the result
        this.res.json(result);
    }

    async delete() {
        const result = await this.query();
        return result;
    }
};
