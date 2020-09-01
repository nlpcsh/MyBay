'use strict';

module.exports = function(data) {
    return {
        getHome(req, res) {
            res.status(200).render('home');
        },
        getContacts(req, res) {
            res.status(200).render('contacts');
        },
        getAbout(req, res) {
            res.status(200).render('about');
        }
    }
}