const expect = require('expect');

const {Users} = require('./users');


describe('Users', () =>  {
    it('should add new user', () =>  {
        var userObj = new Users();

        var user = {
          id: 123,
          name: 'Rajat Gupta',
          room: 'Test Room'
        }

        var returnedUser = userObj.addUser(user.id, user.name, user.room);

        expect(userObj.users).toEqual([user]);
    });
});
