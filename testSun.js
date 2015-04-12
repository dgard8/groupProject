var sun = require('./sunPos');

var date = new Date(),
    lat = 40.2,
    lng = -111.66;

var times = sun.getTimes(date, lat, lng, 10);

//for (time in times){
//   if(time == 'sunrise')
//	console.log(times[time]);
//}
var sunRise = times['sunrise'];
var dateToString = '' + (sunRise.getHours()+6)%12;
dateToString += ':' + sunRise.getMinutes();

console.log(dateToString);
console.log(sunRise);
console.log(date);
console.log(times['apparentRise']);
