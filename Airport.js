const uuidv1 = require('uuid/v1');
let weather = ['stormy', 'sunny', 'sunny', 'sunny'];

function randomWeather(weather) {
    const index = Math.random()*weather.length;
    return weather[Math.floor(index)];
}

function createPlane() {
   return {
    id: uuidv1(),
    flying: true,
    }
}

function createAirport(capacity = 5) {  
    return {
        planes: [],
        capacity,
    }
}

function land(airport, plane, randomWeather) {
    const { planes } = airport;
    if(plane.flying === false) {
        return airport.planes;
    }
    if (airport.planes.length === airport.capacity){
        console.log('We wont land, the airport is full')
    } else if (randomWeather(weather) === 'stormy') {
        console.log('The weather is stormy, we wont land')
    } else if (airport.planes.includes(plane)) {
        console.log('This plane is already in the airport')
    } else {
        plane.flying = false;
        return airport.planes.push(plane);
    }
}
function takeOff(airport, plane, randomWeather) {
    const { planes } = airport;
    if (plane.flying) {
        return console.log('This plane can not take Off because it is already flying');
    }
    if (randomWeather(weather) === 'stormy') {
        console.log('It is stormy, we wont depart');
    } else if (planes.includes(plane) === false) {
        console.log('This plane can not take Off as it is not in the airport');        
    } else {
        plane.flying = true;
        console.log('The plane has left');
        return planes.shift();
    }
}


// then refactor the tests to use the newly created functions

module.exports = {
    createPlane,
    createAirport,
    land,
    takeOff,
    randomWeather,
}