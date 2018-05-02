
var friends = require('../data/friends.js');

module.exports = function(app) {

    //Tables API route
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var bestFriend = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;
        var totalDifference = 0;

        for (var i = 0; i < friends.length; i++) {

            totalDifference = 0;

            for (var j = 0; j < friends[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= bestFriend.friendDifference) {

                    bestFriend.name = friends[i].name;
                    bestFriend.photo = friends[i].photo;
                    bestFriend.friendDifference = totalDifference;
                    
                }
            }
        }
        friends.push(userData);
        res.json(bestFriend);
    });

}