var functions = require('./Airport.js');
const addPlane = functions.addPlane;

describe("Airport", () => {
    test("addPlane() should add a new plane in the airport", () => {
        expect(addPlane().length).toEqual(1)
    });
});