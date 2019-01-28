const land = require('./Airport.js').land;
const airport = require('./Airport.js').airport;
const plane = require('./Airport.js').plane;

describe("Airport", () => {
    test("land() should add a new plane in the airport", () => {
        land(airport, plane);
        expect(airport.length).toEqual(1);
    });
    test("takeOff() should confirm when a plane takes off the airport", () => {
        takeOff(airport, plane);
        expect(airport.length).toEqual(0);
    })
});