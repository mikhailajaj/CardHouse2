

var jqmReady =$.Deferred();
var cordovaReady = $.Deferred();
$(document).on("pagecreate",jqmReady.resolve);
window.addEventListener("deviceReady",cordovaReady.resolve);
$.when(jqmReady,cordovaReady).then(initApp);
function initApp(){
    var cards = cards();
    initPlayers(cards);
}

var cardsDeck = cards();
var playerNumber= 1;


// creating the card deck
var cards =function () {
    var cardList = [];
    var SUITS = ["spade", "heart", "diamond", "club"];
    var card;
    for(var i = 1;i<52;i++){
        card={
            value:i,
            svgLink:"/img/cards/"+this.value+".svg",
            suit:SUITS[Math.floor(number/13)]
        };
        cardList[i-1] = card;
    }
    return cardList;
};

// creating the card object
function initPlayers(deck) {
    var player1 = player.cardList(deck);
    var player2 = player.cardList(deck);
    var player3 = player.cardList(deck);
    var player4 = player.cardList(deck);


    player1.next = player2;
    player2.next = player3;
    player3.next = player4;
    player4.next = player1;
    return [player1,player2,player3,player4]
}

player={
    cardList:generateHandCards13(cardsDeck),
    suitCallPlayer:suitCall(),
    suitCallComputer:0,
    profilePath:"www/img/logo.png",
    playerName:"computer"+this.playerNumber,
    playerNumber:playerNumber++,
    AiPlayer:true,
    played:false,
    playerScore:0,
    playerNext:null,
    playCard:function () {
        if(this.AiPlayer === false){

        }else{

        }
    },
    callBitIn:true,
    callTarneeb:callTarneeb()
};

function callTarneeb() {
    $("suits-option").show(slow).on("click",function (ev) {
        var self = $(this);
        var suitCalled = self.val();
        self.parent().hide("fast");
        return suitCalled;
    })
}

function generateHandCards13(deck){

    //give 13 card to each player
    var cardValue;
    var cards = [];
    for(var i = 0; i< 13;i++){
        cardValue = getRandomInt(deck.length);
        //check if the card has two instant
        cards[i]=deck(card).pop();
    }
    return cards;
}

function getRandomInt(max ) {

    return Math.floor((Math.random() * Math.floor(max)) +1);
}

function suitCall() {
    console.log("suitCall is fired from playerObj function");
    var bitObject = $("#bit-object");
    bitObject.on("click", function (e) {
        return $(this).val()&& $(this).parent().hide("fast");
    });
}

function roundControl(listOfFourCards,primarySuit) {
    var winner = new Card(0);
    for(var i = 0;i<listOfFourCards.length;i++){
        if(listOfFourCards[i].suit === primarySuit && winner.suit !== primarySuit ){
            winner = listOfFourCards[i];
        }
        if(listOfFourCards[i].suit === primarySuit && winner.suit === primarySuit ) {
            if (winner.value > listOfFourCards[i].value) {
              winner = listOfFourCards[i];
            }
        }
        if(winner.value < listOfFourCards[i].value && winner.suit !== primarySuit){
            winner = listOfFourCards[i]
        }

    }
    return winner;
}

var game = {
    initGame:game(this.players),
    players:initPlayers(this.Deck),
    Deck:cardDeck(),
    gameRule1:function (score) {
        while (score < 31){
            this.noWinner = true
            return;
        } ;
        this.noWinner = false;
    },
    tarneebSuit:"",
    gameRule2:roundControl(this.cardsPlayed,this.tarneebSuit),
    noWinner:true,
    roundWinner:null,
    //cardsPlayed is $ * (player, value, suit)
    cardsPlayed:[],

};
function roundControl(listOfFourCards,primarySuit) {
    var winner = new Card(0);
    for(var i = 0;i<listOfFourCards.length;i++){
        if(listOfFourCards[i].suit === primarySuit && winner.suit !== primarySuit ){
            winner = listOfFourCards[i];
        }
        if(listOfFourCards[i].suit === primarySuit && winner.suit === primarySuit ) {
            if (winner.value > listOfFourCards[i].value) {
                winner = listOfFourCards[i];
            }
        }
        if(winner.value < listOfFourCards[i].value && winner.suit !== primarySuit){
            winner = listOfFourCards[i]
        }

    }
    return winner;
}
var cardTurn = [];
function test() {
    console.log("test runs");
    var deck = cardDeck();
    var $divPlayer1 = $("#divPlayer1");
    playerObj(deck,$divPlayer1);


    //var $player2 = $("#player1");

    var $player1 = $("#player1");
    // I stopped here TO-DO
    $player1.on("click","li",function () {
        var self = $(this);
        cardTurn.push(self);
    });

    var baraja = $player1.baraja();
    console.log(baraja);
    $("#fan-close").on("click",function (ev) {
        if(baraja.isClosed()){
            baraja.fan();
        }else {
            baraja.close();
        }
    });
    console.log();


    //$player1.text("please do something");
}
//test();


//pass cardTurn
function game(players) {

    var score1 = players[0].score +players[2].score;
    var score2 = players[1].score +players[3].score;
    while (score1 < 41 || score2 < 41){
        var player = players[0];
        var suitCall = [0,7,8,9,10,11,12,13];
        //calling the the highest cards
        var call=0;
        while (player.callBitIn){
            // 7 should be the input from the user
            var tmp = parseInt(player.suitCall());
            if (tmp){
                console.log("tmp is not a number pass is clicked");
                tmp = 0;
                player.callBitIn = false;
            }

            //disable the button that is clicked or the one that is not

            //TO-Do make the pc not bit
            if(player.next().callBitIn){
                player = player.next();
            }
        }
        //this player has the highest bit
        player.primarySuit();
        for (var i = 0; i < 13; i++) {
            var playedCard = [];
            //RoundWinner is number of the player
            for(var j = 0;j<4;j++){
                //throw card from each player collection of four

                //here the player can play any thing
                //allow the user to play any thing
                var card = player.playCard();
                player.played = true;
                player = player.next;

                playedCard.push(card)
            }
            var RoundWinner = roundControl(listOfFourCards,primarySuit);

            //user interface for this user should increase by 1
            //we to assign the player to first cardplayed
            //here should be the condition if other player has the same suit
        }
    }

};

function cardDeck() {
    var deck=[];
    for(var i = 0;i<52;i++){
        //i object which is card
        var card = new Card(i);
        deck.push(card);
    }
    return deck;
}
function Card(number){
    this.value = number % 13;
    //suit should be
    this.suit = SUITS[Math.floor(number/13)];
    this.imgPath = '<li><img  src="../img/cards/'+ number+'.png"></li>';
}



function playerObj(deck){
    console.log("player is created ");
    this.cardsList = [];
    var $ul = $("<ul id=\"player"+playerNumber++ +"\" class=\"baraja-container\"></ul>");
    var txt = '';
    for (var i = 0; i < 13;i++){
        this.cardsList.push(deck.pop());
        txt += this.cardsList[i].imgPath;

        //console.log(this.cardsList[i].imgPath);
    }
    console.log(txt);
    this.suitCall = (function () {
        console.log("suitCall is fired from playerObj function");
        var bitObject = $("#bit-object");
        bitObject.on("click", function (e) {
            return $(this).val()&& $(this).parent().hide("fast");
        });
    });
    var jQueryObjListOfCards = $ul.html(txt);
    $place.append(jQueryObjListOfCards);
    this.profileImgPath = "<img  src = \"../img/logo.png\">";
    this.playerName = "computer";
    this.played = false;
    this.playerScore = 0;
    this.next = null;
    this.playCard = function () {
        var $obj = this.getJQueryObj;
        var list = this.cardsList;
        $obj.on("click","img",function(list){
            var $imgAtrr = $(this).attr("src");
            var i = 0;
            for(;i< list.length;i++){
                if(list[i].imgPath === $imgAtrr){
                    break;
                }
            }
            $(this).hide();
            return list[i];
        });
    };
    this.callBitIn = true;
    this.primarySuit = (function () {
        var suitsOption = $("#suits-option");
        suitsOption.on("click", "a", function (e) {
            return $(this).text();


        });
    });

}




/*
for (var i=0; i <13; i++){
//RoundWinner is number of the player
    var RoundWinner = roundBasic();
    //we to assign the player to first cardplayed
    //here should be the condition if other player has the same suit
}
loop throw the players giving them a call between (7-13) or pass
function highestBit() go throw the player and return a player number and highest bit(int)
player bits higher choose the suit as (Tarneeb)
same player should start by playing the first card
create function wonRound() it fired after number of card on the table is 4
wonRound() should check and compare the 4 card if it contain any of the primary suit first
then checks the highest two if condition
also add one to player score in the UI

 */

//var roundControl={
    /*
    one is the collection of(four players card each)
    takes a collection of 4 cards and returns the winner
     */
//};
var firstTimePlayed={
    /*
    here is where the game starts
    the player throws the first card allowed to play any other card ()
    //here is where the UI shows all the card to the user so he/she can click it !important user interface
     */
};

//app.initialize();