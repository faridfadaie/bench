var express = require('express');
var router = express.Router();
var fs = require('fs');
var host_name = crypto.createHash('sha1');
host_name.update(require('os').hostname());
host_name = idHash.digest('hex').substr(0,8);

/* GET home page. */
router.get('/', function(req, res, next) {
		var params = req.query || {};
		if (!params.e || !params.i) {
			return res.jsonp({
				type: 'error'
			});
		}
		var re = /[^a-z0-9]/gi;
		if (!re.test(params.i)) {
			return res.jsonp({
				type: 'error'
			});
		}
		var e = new Buffer(params.e, 'base64').toString('ascii');
		try {
			e = JSON.parse(e);
		} catch (r) {
			return res.jsonp({
				type: 'invalid'
			});
		}
		var date = new Date();
		var day = String(date.getDate());
		var monthIndex = String(date.getMonth());
		var year = String(date.getFullYear());
		var hour = String(date.getHours());
		e['eventName'] = params.i;
		e['ip'] = req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
		e['ua'] = req.headers['user-agent'];
		var now = new Date().getTime();
		e['ts'] = Math.floor( now / 1000);
		var f_name = 'bench.prod-i-' + host_name + '-' + params.i + '-' + hour + '00';
		fs.appendFile(f_name, JSON.stringify(e), function(err) {
		if (err) {

		};
	}); res.jsonp({
		type: 'ok'
	});
});

module.exports = router;
