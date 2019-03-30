var jqmReady =$.Deferred();
var cordovaReady = $.Deferred();
$(document).on("pagecreate",jqmReady.resolve);
window.addEventListener("deviceReady",cordovaReady.resolve);
$.when(jqmReady,cordovaReady).then(initApp);
function initApp(){


    //initPlayers(cards());
};

//if these two are comented out
var players = initPlayers(cards());
//console.log(players+"plauers");

var playerNumber= 1;


var gameObj = {
    //deck is 52 card object
    players:initPlayers(cards()),
    initGame:game(this.players),
    gameRule1:function (score) {
        while (score < 31){
            this.noWinner = true;
            return;
        } ;
        this.noWinner = false;
    },
    tarneebSuit:"",
    cardsPlayed:[],
    //gameRule2:roundControl(this.cardsPlayed,this.tarneebSuit),
    noWinner:true,
    roundWinner:null
    //cardsPlayed is $ * (player, value, suit)

};

// creating the card deck
function cards() {
    console.log("here from the card object");
    this.cardList= [];

    for (var i = 1; i < 53; i++) {

        cardList.push(new Card(i));
    }
    console.log(cardList);
    return this.cardList;
    //console.log(cardList);
}

function Card(number){
    this.SUITS =["spade", "heart", "diamond", "club"];
    this.value = number % 13;
    //suit should be
    this.suit = this.SUITS[Math.floor(number/13)];
    this.imgPath = '<li><img  src="../img/cards/'+ number+'.svg"></li>';
}

// creating the card object
function initPlayers(deck) {
    console.log("from the initPlayers");
    var player1 = PlayerObj;
    player1.AiPlayer = false;
    player1.playerName = "myName";
    var player2 = PlayerObj;
    var player3 = PlayerObj;
    var player4 = PlayerObj;

    player1.next = player2;
    player2.next = player3;
    player3.next = player4;
    player4.next = player1;
    var players = [player1,player2,player3,player4];
    generateHandCards13(deck,players);
    //var players = [player1(),player2(),player3(),player4()];

    console.log(players);

    return players;
};

player ={
    cardList:[],
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
    callBitIn:true
    //callTarneeb:callTarneeb()
};
function PlayerObj(){
    this.cardList=[];
    this.suitCallPlayer=this.AiPlayer?0: suitCall();
    this.suitCallComputer=0;
    this.profilePath="www/img/logo.png";
    this.playerName="computer"+this.playerNumber;
    this.playerNumber=playerNumber++;
    this.AiPlayer=true;
    this.played=false;
    this.playerScore=0;
    this.next=null;
    this.playCard=function () {
        if(this.AiPlayer === false){

        }else{

        }
    };
    this.callBitIn=true;
    //this.callTarneeb=callTarneeb();
}

function shuffle(array) {

    console.log(array);
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


function generateHandCards13(deck,players){

    //give 13 card to each player
    shuffle(deck);
    for(var i = 1;i<5;i++) {
        players[i-1].cardList = deck.slice((i-1)*13,i*13);
    }
    return players;
}


function suitCall() {
    console.log("suitCall is fired from playerObj function");
    var bitObject = $("#bit-object");
    bitObject.on("click", function (e) {
        return $(this).val()&& $(this).parent().hide("fast");
    });
}
/*
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

*/

//pass cardTurn
function game(players) {
    console.log("here from game");
    players[0]();
    players[1]();
    players[2]();
    players[3]();
    console.log(players);
    var score1 = players[0].playerScore +players[2].playerScore;
    var score2 = players[1].playerScore +players[3].playerScore;

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