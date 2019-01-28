let airport = [];
let plane = {};

function land(airport, plane) {
    return airport.push(plane);
}

module.exports = {
    plane,
    airport,
    land,
}