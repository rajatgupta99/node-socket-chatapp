var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()  =>  {
    it('should return the correct object values', ()  =>  {
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
