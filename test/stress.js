var http = require('http');
var options = {
  	host: 'bench.bleep.pm',
  	port: 80,
	agent:false,
  	path: 'http://bench.bleep.pm/?callback=jQuery1111026272008079104125_1429906480408&i=bleep_stress&e=eyJjYXRlZ29yeSI6Im5vX3JlZmVycmFsIiwiYWN0aW9uIjoiZG93bmxvYWQiLCJsYWJlbCI6Im1hYyIsInVpZCI6ImYzODVkMWEyLWNlZjItNGE5Ny04YTFkLTBkNjRkYzcwNGJlZiJ9&_=142990648040d9'
};

function send(cb, er){
	var now = new Date().getTime();
	http.get(options, function(res) {
		res.resume();
	  res.on('data', function (chunk) {
		  cb(new Date().getTime() - now);
	  });
	}).on('error', function(e) {
		console.log(e)
		er(new Date().getTime() - now);
	});
}

var res_times = [];
function register_time(t){
	res_times.push(t);
	var sum = res_times.reduce(function(a, b){return a+b;});
	console.log('Got response in ' + t + ' miliseconds. The average so far is '+ sum/res_times.length);
}

function run_concurrently(n, wait_between_calls){
	for (var i = 0; i<n; i++){
		setTimeout(function(){
			send(register_time, function(e){
				console.log('we hit an error in ' + e + ' miliseconds.');
			});
		}, i * (wait_between_calls || 0));
	}
}

var num_con_calls = 10000;
run_concurrently(num_con_calls, 10);

