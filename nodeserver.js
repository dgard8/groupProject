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
    var date = new Date(req.body.Date),
	zip = req.body.Zip,
        lat = req.body.Latitude,
        lng = req.body.Longitude,
	name = req.body.Name;
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

    //insert into the database
    var dbObj = {name:name,zip:zip,time:appriseTime,date:date};
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost/project",function(err,db){
      if (err) throw err;
      db.collection("times").insert(dbObj,function(err,records){
	//console.log(dbObj);
	//console.log(records[0]);
	console.log('record added as '+records[0]._id);
      });
    });

    res.writeHead(200);
    res.end(appriseTime);
});
app.listen(80);
