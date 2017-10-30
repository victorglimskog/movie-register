const RestSql = require('./rest-sql.class');

module.exports = async (query, params) => {
    const result = await RestSql.db.query(query, params);
    return result.rows;
};
