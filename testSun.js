var sun = require('./sunPos');

var date = new Date(),
    lat = 40.2,
    lng = 111.66;

var times = sun.getTimes(date, lat, lng, 10);

//for (time in times){
//   if(time == 'sunrise')
//	console.log(times[time]);
//}

console.log(times['sunrise']);
console.log(times['apparentRise']);
