function analyseUrl(req) {
    const url = req.url;
    const method = req.method.toLowerCase();
    const urlParts = req.url.split('/');
    const baseUrl = urlParts[1];
    const table = urlParts[2];

    return {
        url: url,
        method: method,
        table: table,
        baseUrl: baseUrl,
    };
}

function userAllowedRoute(urlProps) {
    const disallowedRoutes = ['users', 'roles', 'usersroles'];

    if (urlProps.method === 'delete') {
        return false;
    }
    if ( disallowedRoutes.includes(urlProps.table)) {
        return false;
    }
    console.log('its ok');
    return true;
}

function auth(req, res, next) {
    const urlProps = analyseUrl(req);
    const session = req.session;
    const user = req.session ? req.session.user : null;
    console.log(urlProps);

    // allow all access if not accessing restapi
    if (urlProps.baseUrl !== 'restapi') {
        next();
        return;
    }

    if (session && user) {
        // Allow Admin to do as he/she damn well pleases
        if (user.roles.includes('admin')) {
            console.log('Admin time!');
            return next();
        } else if (user.roles.includes('user')) {
            console.log('User time');
            if (userAllowedRoute(urlProps)) {
                console.log('OK!');
                return next();
            }
        }
    }
    return res.status(401).json({msg: 'unauthorized'});
}

module.exports = auth;
