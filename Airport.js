let airport = [];

function land(airport, plane) {
    return airport.push(plane);
}

function takeOff(airport) {
    return airport.shift();
}

module.exports = {
    airport,
    land,
    takeOff,
}