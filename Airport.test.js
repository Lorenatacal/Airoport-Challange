const land = require('./Airport.js').land;
const takeOff = require('./Airport.js').takeOff;

describe("Airport", () => {
    test('land() should add a new plane in the airport', () => {
        let airportLuton = [];
        let plane = {};
        let randomWeather = () => {};
        let fullCapacity = 5;

        land(airportLuton, plane, randomWeather, fullCapacity);
        expect(airportLuton.length).toEqual(1);
    });
    test('land() should not allow a plane to land when the airport is full', () => {
        let randomWeather = () => {};
        let fullCapacity = 5;
        let plane = {};
        let plane1 = {};
        let plane2 = {};
        let plane3 = {};
        let plane4 = {};
        let airportLuton = [plane, plane1, plane2, plane3, plane4];
        let consoleSpy = jest.spyOn(console, 'log')

        land(airportLuton, plane, randomWeather, fullCapacity);
        expect(consoleSpy).toHaveBeenCalledWith('We wont land, the airport is full');
    })
    test('land() should not allow a plane to land when the weather is stormy', () => {
        let randomWeather = () => { return 'stormy' };
        let airportLuton = [];
        let plane = {};
        let fullCapacity = 5;
        let consoleSpy = jest.spyOn(console, 'log');

        land(airportLuton, plane, randomWeather, fullCapacity);
        expect(consoleSpy).toHaveBeenCalledWith('The weather is stormy, we wont land')
    });
    test('takeOff() should confirm when a plane takes off the airport', () => {
        let randomWeather = () => {};
        let plane = {};
        let plane1 = {};
        let plane2 = {};
        let consoleSpy = jest.spyOn(console, 'log')
        let airportLondon = [plane, plane1, plane2];

        takeOff(airportLondon, randomWeather);
        takeOff(airportLondon, randomWeather);
        expect(airportLondon.length).toEqual(1);
        expect(consoleSpy).toHaveBeenCalledWith('The plane has left');
    })
    test('takeOff() should not allow plane to takeOff when the weather is stormy', () => {
        let randomWeather = () => { return 'stormy' };
        let plane = {};
        let plane1 = {};
        let plane2 = {};
        let airportLondon = [plane, plane1, plane2];
        let consoleSpy = jest.spyOn(console, 'log')

        takeOff(airportLondon, randomWeather);
        expect(consoleSpy).toHaveBeenCalledWith('It is stormy, we wont depart')
    })
});