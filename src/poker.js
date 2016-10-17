//kartya lapok definialasa
const colors = [
    'diamonds', 'spades', 'heart', 'clubs'
];

var utils = {
    valueSort: function(a, b) {
        return a - b;
    },
    getAlias: function(value) {
        if(value > 10) {
            value === 11 ? value = 'J' : (value === 12 ? value = 'Q' : (value === 13 ? value = 'K' : value = 'A'));
        }
        return value;
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    ready: function(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    },
    givePlaces: function(players) {
        players.forEach(player => {
            let place = 1;
            players.forEach(insidePlayer => {
                if (insidePlayer.rank > player.rank) {
                    place++;
                }
            });
            player.place = place;
        });
    }
};

class Card {
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }

    getValue() {
        return this.value;
    }

    getColor() {
        return this.color;
    }

    getAliasValue() {
        let aliasValue = this.value;
        if(aliasValue > 10) {
            aliasValue === 11 ? aliasValue = 'J' :
                (aliasValue === 12 ? aliasValue = 'Q' :
                    (aliasValue === 13 ? aliasValue = 'K' : aliasValue = 'A'));
        }
        return aliasValue;
    }

    createHandString(strings, ...values) {
        let result = "";
        result += strings[0];
        result += values[0];
        result += strings[1];
        result += values[1];
        result += strings[2];
        return result;
    }
}

// import {Player} from "./Player.js";

class Player {
    constructor(hand) {
        this.hand = hand;
        this.rank = this.getRank();
    }

    getHandValues() {
        var handValues = [];
        this.hand.forEach(function(card) {
            handValues.push(card.getValue());
        });
        return handValues.sort(this.sortValue);
    }

    getHandColors() {
        var handColors = [];
        this.hand.forEach(function(card) {
            handColors.push(card.getColor());
        });
        return handColors.sort();
    }

    sortValue(a, b) {
        return a - b;
    }

    getRank() {
        let values = this.getHandValues(),
            rank = 0;
        values.forEach((value, index) => {
            rank += value / (5 - index) + (values[4] * 2);
        });
        return rank;
    }
}


// node_modules\.bin\babel src -d lib

utils.ready(main);

function main() {

    //jatekosok meghatarozasa
    let numberOfPlayers = 4,
        players = [],
        usedCards = [];

    if(numberOfPlayers > 10) {
        alert('Too many players!');
        return false;
    }
    //osztas
    for(let i = 0; i < numberOfPlayers; i++) {
        let hand = [];
        for (let i = 0; i < 5; i++) {
            let actualValue = utils.getRandomInt(2, 14),
                actualColor = colors[utils.getRandomInt(0, 3)],
                actualCard = new Card(actualValue, actualColor);

            // TODO: ES6 equals fuggveny (felul)definialasa?
            if (JSON.stringify(usedCards).indexOf(JSON.stringify(actualCard)) !== -1) {
                console.log('if');
                i--;
            } else {
                hand[i] = actualCard;
                usedCards.push(hand[i]);
            }
        }
        players[i] = new Player(hand);
    }

    /**
     * vegig megyunk az osszes jatekoson, es eldontjuk kinek mije van
     */
    players.forEach((player, index) => {
        document.querySelector('body').innerHTML += '<div class="result result' + index +'"></div>';
        document.querySelector('body').innerHTML += '<div class="hand' + index +'"></div>';

        let handColors = player.getHandColors(),
            handValues = player.getHandValues(),

            //DOM elements
            result = document.querySelector('.result' + index),
            handElement = document.querySelector('.hand' + index);

        player.hand.forEach(card => {
            handElement.innerHTML += card.createHandString`Value: ${card.getAliasValue()} Color: ${card.getColor()}<br/>`;
        });

        //flush detektalas
        let flush = false;
        if(handColors[0] === handColors[4]) {
            flush = true;
        }

        //sor detektalas
        let isUnique = true,
            duplicatums = [];

        //ha sor van, akkor a tomb uniqe
        for(let i = 0; i < 4; i++) {
            if (handValues[i + 1] == handValues[i]) {
                isUnique = false;
                duplicatums.push(handValues[i]);
            }
        }

        if(flush) {
            if(isUnique && handValues[0] === 10 && handValues[4] === 14) {
                result.innerHTML = 'Royal flush! ';
                player.rank += 350000;
                // result.innerHTML += 'Rank: ' + player.rank;
                return false;
            } else {
                result.innerHTML = 'Flush ';
                player.rank += 120000 + handValues[0];
                // result.innerHTML += 'Rank: ' + player.rank;
            }
        }

        if(isUnique && ((handValues[4] - handValues[0] === 4) || (handValues[4] === 14 && handValues[3] === 5))) {
            result.innerHTML = 'Straight ';
            player.rank += 100000 + handValues[0];
            // result.innerHTML += 'Rank: ' + player.rank;
            if(flush) {
                player.rank += 50000 + handValues[0];
                result.innerHTML = 'Straightflush ';
                // result.innerHTML += 'Rank: ' + player.rank;
            }
            return false;
        }

        duplicatums.sort(utils.valueSort);

        if(duplicatums.length === 3) {
            if(duplicatums[0] !== duplicatums[2]) {
                result.innerHTML = 'Full house! ';
                player.rank += 150000 + duplicatums[0] + duplicatums[2];
                // result.innerHTML += 'Rank: ' + player.rank;
            } else {
                player.rank += 200000 + duplicatums[0];
                result.innerHTML = 'Four of a kind (poker)! ';
                // result.innerHTML += 'Rank: ' + player.rank;
            }
            return false;
        }

        //parok keresese
        if(!isUnique) {
            duplicatums.forEach((value, key) => {
                if(value === duplicatums[key + 1]) {
                    result.innerHTML += utils.getAlias(value) + " three of a kind ";
                    player.rank += 50000 + (value * value * 100);
                } else if(value !== duplicatums[key - 1]){
                    player.rank += 20000 + (value * value * 25);
                    result.innerHTML += utils.getAlias(value) + " pair ";
                }
            });

            // result.innerHTML += 'Rank: ' + player.rank;
        } else if(!flush) {
            result.innerHTML = utils.getAlias(handValues[4]) + ' high card ';
            // result.innerHTML += 'Rank: ' + player.rank;
            return false;
        }
    });

    //a beallitott rankok alapjan kiosztjuk a helyeket
    utils.givePlaces(players);
    players.forEach((player, index) => {
        let result = document.querySelector('.result' + index);
        result.innerHTML += ', Place: ' + player.place;
    })
}