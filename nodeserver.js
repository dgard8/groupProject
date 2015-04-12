var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use('/', express.static('./html')).
    use('/images', express.static( '../images')).
    use('/lib', express.static( '../lib'));
app.use(bodyParser());
app.get('/gettime', function (req, res) {
    console.log("in gettime route");
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost/project", function(err, db){
	if(err) throw err;
	db.collection("times",function(err, times){
	    if(err) throw err;
	    times.find(function(err,items){
		items.toArray(function(err, itemArr){
		    res.writeHead(200);
		    res.end(JSON.stringify(itemArr));
		});
	    });
	});
    }); 
});
app.post('/gettime',function(req, res) {
    console.log("In gettime post");
    console.log(req.body);
   
    //this is an optional place where finding angle can go
    var angle = req.body.Angle;


    //figure out what time sun will rise
    var sun = require('./sunPos');
    var date = new Date(req.body.Date),  //this is just current date, change to date specified
        lat = req.body.Latitude,  //this is provo, change to update with zipcode
        lng = req.body.Longitude,
	timeOffset = req.body.TimeOffset/60;

    var times = sun.getTimes(date, lat, lng, angle);
    var sunrise = times['sunrise'];
    var riseTime = '' + sunrise.getHours()-timeOffset;
    riseTime += ':' + sunrise.getMinutes();
    console.log(riseTime);
    var appSunrise = times['apparentRise'];
    var appriseTime =''+ appSunrise.getHours()-timeOffset;
    appriseTime += ':' + appSunrise.getMinutes();
    console.log(appriseTime);

    res.writeHead(200);
    res.end();
});
app.listen(80);
