const land = require('./Airport.js').land;
const takeOff = require('./Airport.js').takeOff;
const randomWeather = require('./Airport.js').randomWeather;
const createPlane = require('./Airport.js').createPlane;
const createAirport = require('./Airport.js').createAirport;

function createPlanes(n) {
    let planes = [];
    let array = Array.apply(null, Array(n));
    array.forEach(function(elem) {
        planes.push(createPlane());
    });
    return planes;
}

test('createPlane() should create a new plane', () => {
    let plane = createPlane();
    
    expect(typeof plane).toEqual('object');
    expect(plane).toHaveProperty('id');
    expect(plane.flying).toEqual(true);
})
test('createAirport() should create a new airport', () => {
    let airport = createAirport();

    expect(typeof airport).toEqual('object');
    expect(airport).toHaveProperty('planes');
    expect(airport).toHaveProperty('capacity');
})
test('createAirport() should override default capacity', () => {
    let expectedCapacity = 10;
    let airport = createAirport(expectedCapacity);
    let { capacity } = airport;

    expect(capacity).toEqual(expectedCapacity);
})
describe("Airport", () => {
    describe('land()', () => {
        test('should add a new plane in the airport', () => {
            let airportLuton = createAirport();
            let plane = createPlane();
            let randomWeather = () => {};

            land(airportLuton, plane, randomWeather);
            expect(airportLuton.planes.length).toEqual(1);
        });
        test('should not allow a plane to land when the airport is full', () => {   
            let randomWeather = () => {};
            let airportLuton = createAirport();
            let planes = createPlanes(6);
            let consoleSpy = jest.spyOn(console, 'log');

            planes.forEach(function(elem) {
                land(airportLuton, elem, randomWeather);
            });
           
            expect(airportLuton.planes.length).toEqual(5);
            expect(consoleSpy).toHaveBeenCalledWith('We wont land, the airport is full');
        })
        test('should not allow a plane to land when the weather is stormy', () => {
            let randomWeather = () => { return 'stormy' };
            let airportLuton = createAirport();
            let plane = createPlane();
            let consoleSpy = jest.spyOn(console, 'log');

            land(airportLuton, plane, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('The weather is stormy, we wont land')
        });
        test('should not allow a plane that has landed to land again', () => {
            let randomWeather = () => { };
            let plane1 = createPlane();    
            let airportLuton = createAirport();
            let planes = airportLuton.planes.push(plane1);
            let consoleSpy = jest.spyOn(console, 'log');

            land(airportLuton, plane1, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('This plane is already in the airport')
        });
        test('should allow a plane that is flying to land', () => {
            let randomWeather = () => { }; 
            let plane = createPlane();
            let airportLuton = createAirport();
            let planes = airportLuton.planes.push(plane);
            let consoleSpy = jest.spyOn(console, 'log');

            land(airportLuton, plane, randomWeather);
            expect(airportLuton.planes.length).toEqual(1)
        })
        test('should not allow a plane that is not flying to land', () => {
            let randomWeather = () => { };
            let plane1 = createPlane();
            plane1.flying = false;
            let airportLuton = createAirport();
            let consoleSpy = jest.spyOn(console, 'log');

            land(airportLuton, plane1, randomWeather);
            expect(airportLuton.planes.length).toEqual(0);
            expect(consoleSpy).toHaveBeenCalledWith('This plane can not land because it is not flying')
        })
    });
    describe('takeOff()', () => {
        test('should remove a specific plane from the airport', () => {
            let randomWeather = () => {};
            let planes = createPlanes(3);
            planes[2].flying = false;

            let airportLondon = createAirport();
            airportLondon.planes.push(planes[0], planes[1], planes[2])

            let consoleSpy = jest.spyOn(console, 'log')
            takeOff(airportLondon, planes[2], randomWeather);
            
            expect(airportLondon.planes.length).toEqual(2);
            expect(airportLondon.planes.includes(planes[2])).toEqual(false);
            expect(consoleSpy).toHaveBeenCalledWith('The plane has left');
        })
        test('should not allow plane to takeOff when the weather is stormy', () => {
            let randomWeather = () => { return 'stormy' };
            let plane = createPlane();
            plane.flying = false;
            let airportLondon = createAirport();
            airportLondon.planes.push(plane);
            let consoleSpy = jest.spyOn(console, 'log')

            takeOff(airportLondon, plane, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('It is stormy, we wont depart')
        })
        test('should not allow a plane to takeOff when the plane it is not in the airport', () => {
            let randomWeather = () => { };
            let plane1 = createPlane();
            plane1.flying = false
            let airportLondon = createAirport();
            let consoleSpy = jest.spyOn(console, 'log')

            takeOff(airportLondon, plane1, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('This plane can not take Off as it is not in the airport')
        })
        test('should not allow a plane that is flying to take off', () => {
            let randomWeather = () => { };
            let plane1 = createPlane();
            let airportLondon = createAirport();
            airportLondon.planes.push(plane1)
            let consoleSpy = jest.spyOn(console, 'log')

            takeOff(airportLondon, plane1, randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('This plane can not take Off because it is already flying')
        })
        test('', () => {
            let randomWeather = () => { };
            let planes = createPlanes(3);
            planes[2].flying = false;
            let airportLondon = createAirport();
            airportLondon.planes.push(planes[0], planes[1], planes[2])
            let consoleSpy = jest.spyOn(console, 'log')

            takeOff(airportLondon, planes[2], randomWeather);
            expect(consoleSpy).toHaveBeenCalledWith('The plane has left');
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