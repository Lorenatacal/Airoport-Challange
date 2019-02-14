let weather = ['stormy', 'sunny', 'sunny', 'sunny'];

function randomWeather(weather) {
    const index = Math.random()*weather.length;
    return weather[Math.floor(index)];
}

function land(airport, plane, randomWeather) {
    if (randomWeather(weather) === 'stormy') {
        console.log('The weather is stormy, we wont land')
    } else if (airport.planes.length === airport.fullCapacity){
        console.log('We wont land, the airport is full')
    } else if (airport.planes.includes(plane)) {
        console.log('This plane is already in the airport')
    } else {
        return airport.planes.push(plane);
    }
}

function takeOff(airport, plane, randomWeather) {
    // plane can't take off because it doesn't exist
    if (airport.planes[0].flying === true) {
        console.log('This plane can not take Off because it is already flying');
    }
    if (randomWeather(weather) === 'stormy') {
        console.log('It is stormy, we wont depart');
    } else if (airport.planes.includes(plane) === false) {
        console.log('This plane can not take Off as it is not in the airport');        
    } else {
        console.log('The plane has left');
        return airport.planes.shift();
    }
}

module.exports = {
    land,
    takeOff,
    randomWeather,
}