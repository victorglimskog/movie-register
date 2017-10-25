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

		if(this.settings.runtimeErrors){
			// if runetime error
			console.log("Error: ",this.settings.runtimeErrors);
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
        // convert iso date strings like "2017-10-05T11:42:46.169Z" to mysql compatible date string
        for (let col in this.req.body) {
            let val = this.req.body[col];
            if (val.indexOf('T') == 10 && val.indexOf('Z') == val.length-1) {
                this.req.body[col] = dateFormat(val, 'yyyy-mm-dd hh:MM:ss'); // "%Y-%m-%d %H:%M:%S"
            }
        }

        let query = 'INSERT INTO ' + '`' + this.table + '` SET ? ';

        // Log the query in the console before we run it
        console.log('query', query, [this.req.body, this.id]);

        // run query with or without id
        let result = await this.query(query, [this.req.body, this.id]);

        // If we get an error from MySQL
        if (result.constructor === Error) {
            this.res.status(500);
        }

        // return the result
        this.res.json(result);
    }
};
