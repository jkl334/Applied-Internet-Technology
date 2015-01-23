var prompt = require('sync-prompt').prompt;
//Part 1

function generateCards() {
	var deck = new Array();
	var face = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
	var suit = new Array("♠", "♥", "♦", "♣");
	var card;
	for (var i = 0; i < 13; i++) {
		for (var a = 0; a < 4; a++) {
			card = {suit: suit[a], face: face[i]}
			deck.push(card);
		}
	}

	return deck;

}

function shuffle(deck) {
	var shuffledDeck = new Array();
	var index;
	for (var i = 0; i < 52; i++) {
		index = Math.floor(Math.random() * deck.length);
		shuffledDeck.push(deck[index]);
		deck.splice(index, 1);
	}
	return shuffledDeck;
}

function calculateHand(hand) {
	var total = 0;
	for (var i = 0; i < hand.length; i++) {
		if (hand[i].face == "K") {
			total = total + 10;
		}
		else if (hand[i].face == "Q") {
			total = total + 10;
		}
		else if (hand[i].face == "J") {
			total = total + 10;
		}
		else if (hand[i].face == "A") {
			total = total + 11;
		}
		else if (hand[i].face == "2") {
			total = total + 2;
		}
		else if (hand[i].face == "3") {
			total = total + 3;
		}
		else if (hand[i].face == "4") {
			total = total + 4;
		}
		else if (hand[i].face == "5") {
			total = total + 5;
		}
		else if (hand[i].face == "6") {
			total = total + 6;
		}
		else if (hand[i].face == "7") {
			total = total + 7;
		}
		else if (hand[i].face == "8") {
			total = total + 8;
		}
		else if (hand[i].face == "9") {
			total = total + 9;
		}
		else if (hand[i].face == "10") {
			total = total + 10;
		}

	}
	if (total > 21) {
		for (var j = 0; j < hand.length; j++) {
			if (hand[j].face == "A") {
				total = total - 10;
			}
		}
	}

	return total;
}

function determineWinner(player, computer) {
	if (player == computer) {
		return "Tie!";
	}
	else if (player > 21 && computer > 21) {
		return "Tie!";
	}
	else if (player > 21) {
			return "Computer wins!";
		}
	else if (computer > 21) {
		return "Player wins!";
	}
	else {
		if ( 21-player > 21-computer) {
			return "Computer wins!";
		}
		else if (21-computer > 21-player) {
			return "Player wins!";
		}
	}
}
// Part 2

//convert hand into an organized String to display
function toString(hand) {
	var string = ""
	for (var i = 0; i < hand.length; i++) {
		string += hand[i].face + hand[i].suit + " ";
	}
	return string;
}

//generate deck/hands, intialize variables
var playdeck = generateCards();
var playerHand = new Array();
var computerHand = new Array();
var gameover = false;
var move = "";

//shuffle deck
playdeck = shuffle(playdeck);


console.log("----------BLACKJACK----------")

//deal while there is more than half the deck left
while (playdeck.length >= 26) {
	gameover = false;

	//intial deal (2 cards each)
	playerHand.push(playdeck.pop());
	playerHand.push(playdeck.pop());
	computerHand.push(playdeck.pop());
	computerHand.push(playdeck.pop());

	//game start
	while (gameover == false) {
	console.log("");
	console.log("Your hand: " + toString(playerHand) + "... for a total of " + calculateHand(playerHand));
	move = prompt("(h)it or (s)tay?: ")
	if (move === "h") {
		playerHand.push(playdeck.pop());
	}
	//game ends when player stays and hands are emptied
	else if (move === "s") {
		console.log("");
		//computer hits when hand value is less than 17
		while (calculateHand(computerHand) < 17) {
			computerHand.push(playdeck.pop());
		}
		console.log("Your hand: " + toString(playerHand) + "(" + calculateHand(playerHand) + ")" + " Computer's hand: " + toString(computerHand) + "(" + calculateHand(computerHand) + ")");
		console.log("")
		console.log(determineWinner(calculateHand(playerHand), calculateHand(computerHand)));
		console.log("");
		console.log("There are " + playdeck.length + " cards left in the deck");
		console.log("----------------------------------------")
		//reset the players' hands
		playerHand = [];
		computerHand = [];
		//set game to over
		gameover = true;

	}
	//wrong input handling
	else {
		console.log("Invalid Input: Please enter 'h' or 's'.")
	}
	}
}
//messages to show when game is over
console.log("There are " + playdeck.length + " cards left in the deck");
console.log("Less than 26 cards left. Game over!");



