var cheerio = require('cheerio');

module.exports = function(body, cb) {

    if(!body) {
        var msg = "Mangler body!";
        return cb(msg, null);
    }

    var $ = cheerio.load(body);

    var resultList = [];

    var obj = {};
    var count = 0;
    $('span#OverFlow').each(function(span_index, elem) {
        count++;

        if(count == 1) {
            obj.prosjektnummer = $(elem).text();
        } else if(count == 2) {
            obj.kunde = $(elem).text();
        } else if(count == 3) {
            obj.probesk = $(elem).text();
        } else if(count == 4) {
            obj.aktkode = $(elem).text();
        } else if(count == 5) {
            obj.beskrivelse = $(elem).text();
        } else if(count == 6) {
            obj.arbeidstype = $(elem).text();

            // Push and clear obj
            resultList.push(obj);
            obj = {};
            count = 0;
        }
    });

    return cb(null, resultList);

};