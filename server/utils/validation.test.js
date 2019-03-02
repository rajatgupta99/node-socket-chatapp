const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () =>  {
    it('should reject non string values', ()  =>  {
      var string = '';
      var returnedString = isRealString(string);
      expect(returnedString).toBeFalsy();
    })

    it('should reject string with only spaces', ()  =>  {
      var string = '   ';
      var returnedString = isRealString(string);
      expect(returnedString).toBeFalsy();
    })

    it('should allow string with non-space character', ()  =>  {
      var string = 'rajat';
      var returnedString = isRealString(string);
      expect(returnedString).toBeTruthy();
    })

});
