'use strict';


module.exports = function() {
    return {
        profile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/unauthorized');
            } else {
                const user = req.user;
                res.status(200).render('profile', user);
            }
        }
    }
}