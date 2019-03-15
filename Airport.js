const uuidv1 = require('uuid/v1');
let weather = ['stormy', 'sunny', 'sunny', 'sunny'];

function randomWeather() {
    const index = Math.random() * weather.length;
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
    if (airportHasPlane(airport, plane)) return airport;
    if (isPlaneFlying(plane)) return airport;
    if (checkCapacity(airport)) return airport;
    if (checkWeather(randomWeather)) return airport; 

    return addPlaneToAirport(airport, plane);
}

function addPlaneToAirport(airport, plane) {
    const { planes } = airport;
    const { id, flying } = plane;
    plane.flying = false;
    planes.push(plane);
    return airport;
}

function isPlaneFlying(plane) {
    const { id, flying } = plane;
    if (plane.flying === false) {
        console.log('This plane can not land because it is not flying');
        return true;
    }
}

function checkCapacity(airport) {
    const { planes, capacity} = airport;
    if (planes.length === capacity) {
        console.log('We wont land, the airport is full');
        return true;
    }
}

function checkWeather(randWeather) {
    if (randWeather() === 'stormy') {
        console.log('The weather is stormy, we wont land');
        return true;
    }
}

function airportHasPlane(airport, plane) {
    const { planes } = airport;
    if (planes.includes(plane)) {
        console.log('This plane is already in the airport');
        return true;
    }
}

function takeOff(airport, plane, randomWeather) {
    let  { planes } = airport;
    if (plane.flying) {
        console.log('This plane can not take Off because it is already flying');
        return airport;
    }
    if (planes.includes(plane) === false) {
        console.log('This plane can not take Off as it is not in the airport');
        return airport
    }
    if (randomWeather(weather) === 'stormy') {
        console.log('It is stormy, we wont depart');
        return airport;      
    } else {
        plane.flying = true;
        console.log('The plane has left');
        airport.planes = planes.filter(airPlane => airPlane !== plane);
        return airport;
    }
}

module.exports = {
    createPlane,
    createAirport,
    land,
    takeOff,
    randomWeather,
}