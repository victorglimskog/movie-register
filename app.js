const express = require('express');
const RestSql = require('./rest-sql.class');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(RestSql.start({
    dbCredentials: {
        host: '127.0.0.1',
        user: 'root',
        password: 'myskul',
        database: 'movieregister2',
    },
    baseUrl: '/restapi',
    idMap: {},
    runtimeErrors: false,
}));

app.use(express.static('./www'));

app.listen(3000, () => {
    console.log('Up and running at Tannhäuser Gate 3k');
});
