/**
 * NavisionController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var Navision = require("../modules/navisionConnect");

module.exports = {

    index: function(req, res, next) {
        // Loginpage

        return res.view({
            pagename: "Time tracker"
        });

    },

    loginValidate: function(req, res, next) {

        // Loginvalidator

        var userid = req.param('userid');
        var password = req.param('password');

        if(userid == '' || password == '') {
            return res.redirect("/navision/login");
        } else {
            Navision.login(userid, password, function(err, session) {
                req.session.User = session;
                return res.redirect('/navision/result');
            });
        }
    },

    result: function(req, res, next) {

        Navision.getTimekoder(req.session.User, function(err, data) {
            res.json(data);
        });

    }

};
