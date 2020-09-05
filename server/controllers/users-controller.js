'use strict';


module.exports = function() {
    return {
        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/login');
            } else {
                const user = req.user;
                res.status(200).render('profile', user);
            }
        }
    }
}