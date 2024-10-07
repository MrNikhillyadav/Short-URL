const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if(! userUid) 
        return res.redirect('login');

    const user = getUser(userUid);

    if (! user) return res.redirect('login');

    req.user = user;
    next();
}

async function checkAuth( req, res, next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);

    req.user = user;
    next();
}



module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}

/*  restrictToLoggedInUserOnly middleware function | to validate user is logged In or not. 

    After login, user must have generated a cookie (envelope). 
    For every  request, this middleware will check if the cookie exists or not as follows:
    
    - checks if user have : userUid contained inside the cookie.
    - if userUid is found, checks if user exists in database.
    - if user exists, stores user object inside req object.
    - continues to next middleware function.

*/
