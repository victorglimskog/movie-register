const express = require('express');
const app = express();
const RestSql = require('./rest-sql.class')

app.use(RestSql.start({
    dbCredentials: {
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "movieregister"
    },
    baseUrl: '/restapi',
    idMap: {},
    runtimeErrors: false
}));

app.use(express.static('./www'));

app.listen(3000, function(){
    console.log("Up and running at Tannhäuser Gate 3k");
});