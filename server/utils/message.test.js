var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', ()  =>  {
    it('should return the correct new message values', ()  =>  {
        var from = 'Rajat Gupta';
        var text = 'Hello World!';
        var generatedMessage = generateMessage(from, text);

        expect(generatedMessage.createdAt).toBeA('number');
        expect(generatedMessage).toInclude({
          from,
          text
        });
        expect(generatedMessage).toBeA('object');

    })
});

describe('generateLocationMessage', ()  =>  {
    it('should return correct new location values', ()  =>  {
        var from = 'Admin';
        var latitude = '99787979';
        var longitude = '-212773179';
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var generatedLocation = generateLocationMessage(from, latitude, longitude);

        expect(generatedLocation.createdAt).toBeA('number');
        expect(generatedLocation).toBeA('object');
        expect(generatedLocation).toInclude({
          from,
          url
        });
    })
});
