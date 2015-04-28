var express = require('express');
var router = express.Router();
var fs = require('fs');
var host_name = require('crypto').createHash('sha1');
host_name.update(require('os').hostname());
host_name = host_name.digest('hex').substr(0,8);

/* GET home page. */
router.all('/', function(req, res, next) {
		if (req.method == 'POST'){
			var params = req.body || {};
			var i = params.eventName;
			if (!params || !i){
				return res.jsonp({
					type: 'error'
				});
			}
		}else{
			var params = req.query || {};
			if (!params.e || !params.i){
				return res.jsonp({
					type: 'error'
				});
			}
			var i = params.i;
		}
		var re = /[^a-z0-9]/gi;
		if (!re.test(i)) {
			return res.jsonp({
				type: 'error'
			});
		}
		if (req.method != 'POST'){
			var e = new Buffer(params.e, 'base64').toString('ascii');
			try {
				e = JSON.parse(e);
			} catch (r) {
				return res.jsonp({
					type: 'invalid'
				});
			}
		}else{
			var e = params;
		}
		var date = new Date();
		var day = String(date.getDate());
		var monthIndex = String(date.getMonth());
		var year = String(date.getFullYear());
		var hour = String(date.getHours());
		e['eventName'] = i;
		e['ip'] = req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
		e['ua'] = req.headers['user-agent'];
		var now = new Date().getTime();
		e['ts'] = Math.floor( now / 1000);
		var f_name = '/log_files/bench.prod-i-' + host_name + '-' + i + '-' + year + monthIndex + day + hour + '00.log';
		fs.appendFile(f_name, JSON.stringify(e), function(err) {
		if (err) {

		};
	}); res.jsonp({
		"type": 'ok',
		"response_code":200
	});
});

module.exports = router;
