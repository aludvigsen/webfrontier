/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    'new': function(req, res) {
        res.view({
            pagename: "Create an account"
        });
    },

    create: function(req, res, next) {

        var userObj = {
            name: req.param('name'),
            email: req.param('email'),
            password: req.param('password'),
            confirmation: req.param('confirmation')
        };

        // Create a User with the params sent from
        // the sign-up form --> new.ejs
        User.create(userObj, function userCreated(err, user) {

            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                };

                // If error redirect back to sign-up page
                return res.redirect('/user/new');
            }

            // Log user in
            req.session.authenticated = true;
            req.session.User = user;

            user.save(function(err, user) {
                if (err) return next(err);

                // After successfully creating the user
                // redirect to the show action
                //res.redirect('/user/show/' + user.id);
                return res.redirect('/');
            });
        });
    },

    index: function(req, res, next) {
        // Get the logged in user
        User.findOne(req.session.User.id, function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            return res.view({
                pagename: "My settings",
                user: user
            });
        });
    },
    // render the edit view (e.g. /views/edit.ejs)
    edit: function(req, res, next) {

        // Find the user from the id passed in via params
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');

            return res.view({
                user: user
            });
        });
    },

    // process the info from edit view
    update: function(req, res, next) {

        User.findOne(req.session.User.id).done(function(err, user) {

            if(req.param('name')) {
                user.name = req.param('name');
            }
            if(req.param('email')) {
                user.email = req.param('email');
            }

            // Gravatar
            if(req.param('sameAsLogin') !== '') {
                user.settings.gravatar.sameAsLogin = req.param('sameAsLogin');
                user.settings.gravatar.email = req.session.User.email;
            }
            if(req.param('gravatarEmail')) {
                user.settings.gravatar.email = req.param('gravatarEmail');
            }

            // Navision
            if(req.param('navisionUsername')) {
                user.settings.navision.username = req.param('navisionUsername');
            }
            if(req.param('navisionPassword')) {
                user.settings.navision.password = req.param('navisionPassword');
            }

            user.save(function(err) {
                if (err) {
                    //tODO: Do some error handling
                    return res.redirect('/user');
                }
                return res.redirect('/user');
            });

        });
    },

    destroy: function(req, res, next) {

        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) return next('User doesn\'t exist.');

            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) return next(err);
            });
            return res.redirect('/user');
        });
    }

};