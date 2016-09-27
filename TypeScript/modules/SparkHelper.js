"use strict";
var Model_1 = require("./Model");
function getPlayerID() {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        return Spark.getPlayer().getPlayerId();
    */
}
exports.getPlayerID = getPlayerID;
function getPlayerData(playerID) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        var playerDataList = Spark.runtimeCollection("playerData");
        return playerDataList.findOne({"playerID": playerID});
    */
}
exports.getPlayerData = getPlayerData;
function getGameData() {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        var gameDataCollection = Spark.runtimeCollection("gameData");
        return gameDataCollection.findOne();
    */
}
exports.getGameData = getGameData;
function save(playerData) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        var playerDataList = Spark.runtimeCollection("playerData");
        playerDataList.update({"playerID": playerData.playerID}, {"$set": playerData}, true, false);
    */
}
exports.save = save;
function getEvent() {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        return Spark.getData();
    */
}
exports.getEvent = getEvent;
function sendMessage(data, playerID) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        Spark.message().setMessageData(data).setPlayerIds(playerID).send();
    */
}
exports.sendMessage = sendMessage;
function setScriptData(variable, data) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        Spark.setScriptData(variable, data);
    */
}
exports.setScriptData = setScriptData;
function loadMatch(matchID) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        var match = Spark.getMultiplayer().loadMatch(matchID);
        if(match == null)
            return null;
        
        var participantList = [];
                
        for (var _i = 0, _a = match.getParticipants(); _i < _a.length; _i++)
        {
            var participant = _a[_i];
            var player = participant.getPlayer();
            participantList[_i] =
            {
    //                name: player.
                playerID: player.getPlayerId(),
            }
        }
        
        var result =
        {
            matchID: matchID,
            participantList: participantList,
        };
        return result;
    */
}
exports.loadMatch = loadMatch;
function playerIsOnline(playerID) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        return Spark.loadPlayer(playerID).isOnline();
    */
}
exports.playerIsOnline = playerIsOnline;
function playerSetAchievement(achievementID) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        var player = Spark.getPlayer();
        player.addAchievement(achievementID);
    */
}
exports.playerSetAchievement = playerSetAchievement;
function saveStartedMatch(startedMatch) {
    var playerIDBlue = startedMatch.teamBlue.playerID;
    var playerIDRed = startedMatch.teamRed.playerID;
    var playerDataBlue = getPlayerData(playerIDBlue);
    var playerDataRed = getPlayerData(playerIDRed);
    playerDataBlue.startedMatch = startedMatch;
    playerDataRed.startedMatch = startedMatch;
    save(playerDataBlue);
    save(playerDataRed);
    var messageBlue = {
        messageType: "MatchFinishedMessage",
        playerData: playerDataBlue
    };
    sendMessage(messageBlue, playerIDBlue);
    var messageRed = {
        messageType: "MatchFinishedMessage",
        playerData: playerDataRed
    };
    sendMessage(messageRed, playerIDRed);
}
exports.saveStartedMatch = saveStartedMatch;
function startMatch(playerData1, playerData2, matchID) {
    var teamInfo1 = {
        playerID: playerData1.playerID,
        displayName: playerData1.displayName,
        avatar: playerData1.avatar,
        race: playerData1.race,
        bot: playerData1.bot
    };
    var teamInfo2 = {
        playerID: playerData2.playerID,
        displayName: playerData2.displayName,
        avatar: playerData2.avatar,
        race: playerData2.race,
        bot: playerData2.bot
    };
    var seed = Model_1.getRandomInt(0, 10000);
    var blue = Model_1.getRandomInt(0, 2);
    var startedMatch = {
        matchID: matchID,
        seed: seed,
        teamRed: blue == 1 ? teamInfo1 : teamInfo2,
        teamBlue: blue == 1 ? teamInfo2 : teamInfo1,
        state: Model_1.StartedMatchState.InProgress,
        finishReason: Model_1.MatchFinishReason.None
    };
    if (playerData1.bot == false) {
        playerData1.startedMatch = startedMatch;
        save(playerData1);
        var message1 = {
            messageType: "MatchStartedMessage",
            playerData: playerData1
        };
        sendMessage(message1, playerData1.playerID);
    }
    if (playerData2.bot == false) {
        playerData2.startedMatch = startedMatch;
        save(playerData2);
        var message2 = {
            messageType: "MatchStartedMessage",
            playerData: playerData2
        };
        sendMessage(message2, playerData2.playerID);
    }
}
exports.startMatch = startMatch;
function sendLeaderboardValue(playerData) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
//		Spark.sendRequest({"@class": ".LogEventRequest", "eventKey": "setLeaderboardGroup", "honor": playerData.honor, "league": playerData.league, "division": playerData.division});
    */
}
exports.sendLeaderboardValue = sendLeaderboardValue;
function resetLeaderboardValue(playerData) {
    //TypeScriptCode
    throw "Заглушка";
    /*SparkCode
        Spark.sendRequest({"@class": ".LogEventRequest", "eventKey": "setLeaderboardGroup", "honor": -1, "league": playerData.league, "division": playerData.division, "local": playerData.local});
    */
}
exports.resetLeaderboardValue = resetLeaderboardValue;
