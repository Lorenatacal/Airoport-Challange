const land = require('./Airport.js').land;
const takeOff = require('./Airport.js').takeOff;
const randomWeather = require('./Airport.js').randomWeather;
const uuidv1 = require('uuid/v1');

describe("Airport", () => {
    describe('land()', () => {
        test('should add a new plane in the airport', () => {
            let airportLuton = {
                planes: [],
                fullCapacity: 5,
            };
            let plane = {};
            let randomWeather = () => {};

            land(airportLuton, plane, randomWeather);
            expect(airportLuton.planes.length).toEqual(1);
        });
        test('should not allow a plane to land when the airport is full', () => {
            let randomWeather = () => {};
            let airportLuton = {
                planes: [{}, {}, {}, {}, {}],
                fullCapacity: 5,
            };
            let plane = {};
            let consoleSpy = jest.spyOn(console, 'log')

            land(airportLuton, plane, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('We wont land, the airport is full');
        })
        test('should not allow a plane to land when the weather is stormy', () => {
            let randomWeather = () => { return 'stormy' };
            let plane = {};        
            let airportLuton = {
                planes: [],
                fullCapacity: 5,
            };
            let consoleSpy = jest.spyOn(console, 'log');

            land(airportLuton, plane, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('The weather is stormy, we wont land')
        });
        test('should not allow a plane that has landed to land again', () => {
            let randomWeather = () => { };
            let plane1 = {};     
            let airportLuton = {
                planes: [plane1],
                fullCapacity: 5,
            };
            let consoleSpy = jest.spyOn(console, 'log');

            land(airportLuton, plane1, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('This plane is already in the airport')
        })
    });
    describe('takeOff()', () => {
        test('should confirm when a plane takes off the airport', () => {
            let randomWeather = () => {};
            let plane = {};
            let airportLondon = {
                planes: [plane, plane, plane],
                fullCapacity: 5,
            };
            let consoleSpy = jest.spyOn(console, 'log')

            takeOff(airportLondon, plane, randomWeather);
            takeOff(airportLondon, plane,  randomWeather);
            expect(airportLondon.planes.length).toEqual(1);
            expect(consoleSpy).toHaveBeenCalledWith('The plane has left');
        })
        test('should not allow plane to takeOff when the weather is stormy', () => {
            let randomWeather = () => { return 'stormy' };
            let plane = {};
            let airportLondon = {
                planes: [plane],
                fullCapacity: 5,
            };
            let consoleSpy = jest.spyOn(console, 'log')

            takeOff(airportLondon, plane, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('It is stormy, we wont depart')
        })
        test.only('should not allow a plane to takeOff when the plane it is not in the airport', () => {
            let randomWeather = () => { };
            let plane = {};
            let airportLondon = {
                planes: [],
                fullCapacity: 5,
            };
            let consoleSpy = jest.spyOn(console, 'log')

            takeOff(airportLondon, plane, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('This plane can not take Off as it is not in the airport')
        })
    });
    describe('randomWeather()', () => {
        test('should return sunny when Math.random returns 0.9', () => {
            let weather = ['stormy', 'sunny', 'sunny', 'sunny'];
            let randomSpy = jest.spyOn(Math, 'random').mockImplementation(() => 0.9);
            let weatherCondition = randomWeather(weather);
    
            expect(randomSpy).toHaveBeenCalled();
            expect(weatherCondition).toEqual('sunny');
        });
        test('should return stormy when Math.random returns 0', () => {
            let weather = ['stormy', 'sunny', 'sunny', 'sunny'];
            let randomSpy = jest.spyOn(Math, 'random').mockImplementation(() => 0);
            let weatherCondition = randomWeather(weather);
    
            expect(randomSpy).toHaveBeenCalled();
            expect(weatherCondition).toEqual('stormy');
        })
    });  
});