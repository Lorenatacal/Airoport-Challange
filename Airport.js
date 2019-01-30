let airport = [];

function land(airport, plane) {
    return airport.push(plane);
}

function takeOff(airport) {
    console.log('The plane has left');
    return airport.shift();
}

module.exports = {
    airport,
    land,
    takeOff,
}