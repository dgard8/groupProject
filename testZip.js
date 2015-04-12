var http = require('http');

var options = {
  hostname: 'api.zippopotam.us/us/84602',
  port: 80,
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('headers:\n' + JSON.sringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function(chunk){
    console.log(chunk);
  });
});


//var client = new XMLHttpRequest();
//client.open("GET", "http://api.zippopotam.us/us/90210", true);
//client.onreadystatechange = function() {
//	if(client.readyState == 4) {
//		alert(client.responseText);
//	};
//};

//client.send();
