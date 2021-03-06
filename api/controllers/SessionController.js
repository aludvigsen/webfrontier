/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var Bcrypt = require('bcryptjs'),
    Gravatar = require('gravatar');

module.exports = {

	'new': function(req, res) {
		res.view({
            pagename: "Sign in"
        });
	},

	create: function(req, res, next) {

		// Check for email and password in params sent via the form, if none
		// redirect the browser back to the sign-in form.
		if (!req.param('email') || !req.param('password')) {
			// return next({err: ["Password doesn't match password confirmation."]});

			var usernamePasswordRequiredError = [{
				name: 'usernamePasswordRequired',
				message: 'You must enter both a username and password.'
			}];

			// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
			// the key of usernamePasswordRequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError
			};

			res.redirect('/session/new');
			return;
		}

		User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			if (err) return next(err);

			// If no user is found...
			if (!user) {
				var noAccountError = [{
					name: 'noAccount',
					message: 'The email address ' + req.param('email') + ' not found.'
				}];
				req.session.flash = {
					err: noAccountError
				};
				res.redirect('/session/new');
				return;
			}

			// Compare password from the form params to the encrypted password of the user found.
			Bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					var usernamePasswordMismatchError = [{
						name: 'usernamePasswordMismatch',
						message: 'Invalid username and password combination.'
					}];
					req.session.flash = {
						err: usernamePasswordMismatchError
					};
					res.redirect('/session/new');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.User = user;

                // Set gravatar image
                req.session.User.gravatar = Gravatar.url(user.email, {s: 60});

				user.save(function(err, user) {
					if (err) return next(err);

					res.redirect('/user');
				});
			});
		});
	},

	destroy: function(req, res, next) {

		User.findOne(req.session.User.id, function foundUser(err, user) {

			// Wipe out the session (log out)
			req.session.destroy();

			// Redirect the browser to the sign-in screen
			res.redirect('/session/new');
		});
	}
};