function createForm() {
    var form = FormApp.create("Clipping. - CLPPNG");
    var item = form.addMultipleChoiceItem();
    item.setTitle("Vote a song out");
    item.setRequired(true);
    item.setChoices([
        item.createChoice("Intro"),
        item.createChoice("Body & Blood"),
        item.createChoice("Work Work"),
        item.createChoice("Summertime"),
        item.createChoice("Taking Off"),
        item.createChoice("Tonight"),
        item.createChoice("Dream"),
        item.createChoice("Get Up"),
        item.createChoice("Or Die"),
        item.createChoice("Inside Out"),
        item.createChoice("Story 2"),
        item.createChoice("Dominoes"),
        item.createChoice("Ends"),
        item.createChoice("Williams Mix")
    ]);
    Logger.log("Published URL: " + form.getPublishedUrl());
    Logger.log("Editor URL: " + form.getEditUrl());
    Logger.log("ID: " + form.getId());
}

function readForm() {
    var form = FormApp.openById("1OeUxvQqpOZTLVq5AYZ_Dqy--tWczFPi1T-wJ1I4iaK8");

    var responses = getResponses(form);
    var voteCountDict = getResponseCounts(responses);
    var maxVotes = getMaxVotes(voteCountDict);
    var songsWithMaxVotes = getSongsWithMaxVotes(voteCountDict, maxVotes);
    // If there is more than one song with maximum votes, pick one at random
    var songOut =
        songsWithMaxVotes[Math.floor(Math.random() * songsWithMaxVotes.length)];
    Logger.log(songOut);
}

function getResponses(form) {
    var responses = [];
    var formResponses = form.getResponses();
    formResponses.forEach(function(formResponse) {
        var itemResponses = formResponse.getItemResponses();
        itemResponses.forEach(function(itemResponse) {
            responses.push(itemResponse.getResponse());
        });
    });
    return responses;
}

function getResponseCounts(responses) {
    var voteCountDict = {};
    responses.forEach(function(response) {
        if (voteCountDict[response]) {
            voteCountDict[response]++;
        } else {
            voteCountDict[response] = 1;
        }
    });
    return voteCountDict;
}

function getMaxVotes(voteCountDict) {
    var maxVotes = 0;
    for (res in voteCountDict) {
        const count = voteCountDict[res];
        if (count > maxVotes) {
            maxVotes = count;
        }
    }
    return maxVotes;
}

function getSongsWithMaxVotes(voteCountDict, maxVotes) {
    var songsWithMaxVotes = [];
    for (res in voteCountDict) {
        if (voteCountDict[res] === maxVotes) {
            songsWithMaxVotes.push(res);
        }
    }
    return songsWithMaxVotes;
}
