let airport = [];

function land(airport, plane, weather) {
    if (weather === 'stormy') {
        console.log('The weather is stormy, we wont land')
    } else {
        return airport.push(plane);
    }
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