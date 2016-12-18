var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

var createEvent = {
    type: "GameCreated",
    user: {
        userName: "Binni"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

var joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Eva"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {

    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
        {
            id:"123987",
            type: "CreateGame",
            user: {
                userName: "Binni"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "Binni"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "Binni"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
        {
            type: "JoinGame",
            user: {
                userName: "Eva"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Eva"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

});

 it('should emit FullGameJoinAttempted event when game full', function (){
        given = [{
            type: "GameCreated",
            user: {
                userName: "Eva"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "Binni"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
        when = 
            {
                type: "JoinGame",
                user: {
                    userName: "Bubbi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side:'O'
            };
        then = [
            {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Bubbi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            }];
});

describe('place a move command', function () {
    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should mark grid[0,0] with X, MovePlaced', function () {
        given = [{
            type: "GameCreated",
            user: {
                userName: "Eva"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "Binni"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "Eva"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 0,
                side:'X'
            };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "Eva"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 0,
                side: 'X'
            }];
    });

    it('should mark grid[1,1] with X, MovePlaced', function () {
            given = [{
            type: "GameCreated",
            user: {
                userName: "Eva"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "Binni"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "Eva"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 4,
                side:'X'
            };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "Eva"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 4,
                side: 'X'
            }];
        });
    
});