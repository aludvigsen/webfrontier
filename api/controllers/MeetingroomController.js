/**
 * MeetingroomController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    index: function(req, res, next) {
        res.view({
            pagename: "Meeting room"
        });
    }
	
};
