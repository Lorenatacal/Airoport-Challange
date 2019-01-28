let airport = [];
let plane = '';

function addPlane(airport, plane) {
    return airport.push(plane);
}

module.exports = {
    plane,
    airport,
    addPlane,
}