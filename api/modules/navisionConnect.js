'use strict';

var request = require('request'),
    Parser = require('./navisionParser');

var ReqSettings = function() {
    this.headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)',
        'Accept-Language': 'en-US,en;q=0.8,nb;q=0.6,da;q=0.4',
        'Origin': 'http://vswweb803:82/'
    };

    this.options = {
        url: "http://vswweb803:82/",
        headers: this.headers,
        encoding: "binary"
    };
    return this.options;
};

var isAuthorized = function(session, cb) {

};

module.exports.login = function(username, password, cb) {

    var options = new ReqSettings();
    options.url += "_start_login.asp";

    if(!username || !password) {
        var msg = "Trenger brukernavn og passord";
        return cb(msg, null);
    }

    options.form = {
        UserID : username,
        Password : password
    };

    request.post(options, function (error, response, body) {
        var session = {};
        session.authCookie = response.headers['set-cookie'][0];
        session.sessionCookie = response.headers['set-cookie'][1];

        // LOGIN VALIDERING //

        return cb(null, session);
    });

};

module.exports.getTimekoder = function(session, cb) {

    var options = new ReqSettings();
    options.url += "registration/reg_period_view.asp";

    var jar = request.jar();
    jar.setCookie(session.sessionCookie, options.url);
    jar.setCookie(session.authCookie, options.url);

    options.jar = jar;

    // GET asp content frame
    request.get(options, function (error, response, body) {
        if(!body) {
            var msg = "Do some error handling, cause there is no body";
            return cb(msg, null);
        }
        Parser(body, function(err, data) {
            return cb(null, data);
        });

    });
};