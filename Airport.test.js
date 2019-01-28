const addPlane = require('./Airport.js').addPlane;
const airport = require('./Airport.js').airport;
const plane = require('./Airport.js').plane;

describe("Airport", () => {
    test("addPlane() should add a new plane in the airport", () => {
        addPlane(airport, plane);
        expect(airport.length).toEqual(1);
    });
});