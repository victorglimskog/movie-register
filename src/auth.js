function auth(req, res, next) {
    if (req.session && req.session.user && req.session.user.username === 'vgl') {
        return next();
    }
    return res.sendStatus(401);
}

module.exports = auth;
