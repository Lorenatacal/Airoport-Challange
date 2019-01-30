let airport = [];

function land(airport, plane) {
    return airport.push(plane);
}

function takeOff(airport, weather) {
    if (weather === 'stormy') {
        console.log('It is stormy, we wont depart');
    } else {
        console.log('The plane has left');
        return airport.shift();
    }
}

module.exports = {
    airport,
    land,
    takeOff,
}