var http = require('http');
var options = {
  host: 'bench.bleep.pm',
  port: 80,
  path: 'http://bench.bleep.pm/?callback=jQuery1111026272008079104125_1429906480408&i=bleep_stress&e=eyJjYXRlZ29yeSI6Im5vX3JlZmVycmFsIiwiYWN0aW9uIjoiZG93bmxvYWQiLCJsYWJlbCI6Im1hYyIsInVpZCI6ImYzODVkMWEyLWNlZjItNGE5Ny04YTFkLTBkNjRkYzcwNGJlZiJ9&_=142990648040d9'
};

function send(cb, er){
	var now = new Date().getTime();
	http.get(options, function(res) {
	  res.on('data', function (chunk) {
		  cb(new Date().getTime() - now);
	  });
	}).on('error', function(e) {
		er(new Date().getTime() - now);
	});
}

var res_times = [];
function register_time(t){
	res_times.push(t);
	var sum = res_times.reduce(function(a, b){return a+b;});
	console.log('Got response in ' + t + ' miliseconds. The average so far is '+ sum/res_times.length);
}

var num_con_calls = 1000000;
for (var i = 0; i<num_con_calls; i++){
	send(register_time, function(e){
		console.log('we hit an error in ' + e + ' miliseconds.');
	});
}

