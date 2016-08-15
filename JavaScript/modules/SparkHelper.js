"use strict";
var exports = {};

function getPlayerID() {
    
        return Spark.getPlayer().getPlayerId();
    
}
exports.getPlayerID = getPlayerID;
function getPlayerData(playerID) {
    
        var playerDataList = Spark.runtimeCollection("playerData");
        return playerDataList.findOne({"playerID": playerID});
    
}
exports.getPlayerData = getPlayerData;
function save(playerData) {
    
        var playerDataList = Spark.runtimeCollection("playerData");
        playerDataList.update({"playerID": playerData.playerID}, {"$set": playerData}, true, false);
    
}
exports.save = save;
function getEvent() {
    
        return Spark.getData();
    
}
exports.getEvent = getEvent;
function sendMessage(data, playerID) {
    
        Spark.message().setMessageData(data).setPlayerIds(playerID).send();
    
}
exports.sendMessage = sendMessage;
function setScriptData(variable, data) {
    
        Spark.setScriptData(variable, data);
    
}
exports.setScriptData = setScriptData;
function loadMatch(matchID) {
    
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
    
}
exports.loadMatch = loadMatch;