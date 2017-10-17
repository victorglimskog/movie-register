const pm = require('promisemaker');
const mysql = require('mysql');

module.exports = class RestSql {

    static start(settings) {
        this.settings = settings;
        this.connectToSql();
        return (...args) => new RestSql(...args);
    }

    static connectToSql(){
        this.db = pm(
            mysql.createConnection(this.settings.dbCredentials),
            {
                rejectOnErrors: this.settings.runtimeErrors,
                mapArgsToProps: {
                    query: ["rows", "fields"]
                }
            }
        )
    };

    constructor(req, res,next){

        this.req = req;
        this.res = res;
        this.next = next

        this.settings = RestSql.settings

        if(this.settings.baseUrl.substr(-1) != '/'){
            this.settings.baseUrl += '/';
        }
        this.analyseUrl();

        if(['get', 'post', 'put','delete'].includes(this.method)){
            this[this.method]();
        }
    }

    async query(query, params){
        let result = await RestSql.db.query(query,params);
        return result.rows;
    }

    analyseUrl(){
        let url = this.req.url;
        let method = this.req.method.toLowerCase();
        let baseUrl = this.settings.baseUrl;
        if(url.index(baseUrl) != 0){
            this.next();
            return;
        }

        let urlParts = url.split(baseUrl, 2)[1].split('/')
        this.table = urlParts[0].split(';').join('');
        this.id = urlParts[1];
        this.method = method;
        this.idColName = this.settings.idMap[this.table] || 'id';
    }
}