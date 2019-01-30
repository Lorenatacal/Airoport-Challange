const land = require('./Airport.js').land;
const takeOff = require('./Airport.js').takeOff;

describe("Airport", () => {
    test('land() should add a new plane in the airport', () => {
        let airportLuton = [];
        let plane = {};
        land(airportLuton, plane);
        expect(airportLuton.length).toEqual(1);
    });
    test('takeOff() should confirm when a plane takes off the airport', () => {
        let plane = {};
        let plane1 = {};
        let plane2 = {};
        let consoleSpy = jest.spyOn(console, 'log')
        let airportLondon = [plane, plane1, plane2];

        takeOff(airportLondon);
        takeOff(airportLondon);
        expect(airportLondon.length).toEqual(1);
        expect(consoleSpy).toHaveBeenCalledWith('The plane has left');
    })
    test('takeOff() should not allow plane to takeOff when the weather is stormy', () => {
        let weather = 'stormy';
        let plane = {};
        let plane1 = {};
        let plane2 = {};
        let airportLondon = [plane, plane1, plane2];
        let consoleSpy = jest.spyOn(console, 'log')

        takeOff(airportLondon, weather);
        expect(consoleSpy).toHaveBeenCalledWith('It is stormy, we wont depart')
    })
});