(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
    function Card(value, color) {
        _classCallCheck(this, Card);

        this.value = value;
        this.color = color;
    }

    _createClass(Card, [{
        key: 'getValue',
        value: function getValue() {
            return this.value;
        }
    }, {
        key: 'getColor',
        value: function getColor() {
            return this.color;
        }
    }, {
        key: 'getAliasValue',
        value: function getAliasValue() {
            var aliasValue = this.value;
            if (aliasValue > 10) {
                aliasValue === 11 ? aliasValue = 'J' : aliasValue === 12 ? aliasValue = 'Q' : aliasValue === 13 ? aliasValue = 'K' : aliasValue = 'A';
            }
            return aliasValue;
        }
    }, {
        key: 'createHandString',
        value: function createHandString(strings) {
            var result = "";
            result += strings[0];
            result += arguments.length <= 1 ? undefined : arguments[1];
            result += strings[1];
            result += arguments.length <= 2 ? undefined : arguments[2];
            result += strings[2];
            return result;
        }
    }]);

    return Card;
}();

exports.Card = Card;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(hand) {
        _classCallCheck(this, Player);

        this.hand = hand;
        this.rank = this.getRank();
    }

    _createClass(Player, [{
        key: "getHandValues",
        value: function getHandValues() {
            var handValues = [];
            this.hand.forEach(function (card) {
                handValues.push(card.getValue());
            });
            return handValues.sort(this.sortValue);
        }
    }, {
        key: "getHandColors",
        value: function getHandColors() {
            var handColors = [];
            this.hand.forEach(function (card) {
                handColors.push(card.getColor());
            });
            return handColors.sort();
        }
    }, {
        key: "sortValue",
        value: function sortValue(a, b) {
            return a - b;
        }
    }, {
        key: "getRank",
        value: function getRank() {
            var values = this.getHandValues(),
                rank = 0;
            values.forEach(function (value, index) {
                rank += value / (5 - index) + values[4] * 2;
            });
            return rank;
        }
    }]);

    return Player;
}();

exports.Player = Player;

},{}],3:[function(require,module,exports){
"use strict";

var _templateObject = _taggedTemplateLiteral(["Value: ", " Color: ", "<br/>"], ["Value: ", " Color: ", "<br/>"]);

var _Card = require("./model/Card.js");

var _Player = require("./model/Player.js");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//kartya lapok definialasa
var colors = ['diamonds', 'spades', 'heart', 'clubs'];

var utils = {
    valueSort: function valueSort(a, b) {
        return a - b;
    },
    getAlias: function getAlias(value) {
        if (value > 10) {
            value === 11 ? value = 'J' : value === 12 ? value = 'Q' : value === 13 ? value = 'K' : value = 'A';
        }
        return value;
    },
    getRandomInt: function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    ready: function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    },
    givePlaces: function givePlaces(players) {
        players.forEach(function (player) {
            var place = 1;
            players.forEach(function (insidePlayer) {
                if (insidePlayer.rank > player.rank) {
                    place++;
                }
            });
            player.place = place;
        });
    }
};

// node_modules\.bin\babel src -d lib

utils.ready(main);

function main() {

    //jatekosok meghatarozasa
    var numberOfPlayers = 4,
        players = [],
        usedCards = [];

    if (numberOfPlayers > 10) {
        alert('Too many players!');
        return false;
    }
    //osztas
    for (var i = 0; i < numberOfPlayers; i++) {
        var hand = [];
        for (var _i = 0; _i < 5; _i++) {
            var actualValue = utils.getRandomInt(2, 14),
                actualColor = colors[utils.getRandomInt(0, 3)],
                actualCard = new _Card.Card(actualValue, actualColor);

            // TODO: ES6 equals fuggveny (felul)definialasa?
            if (JSON.stringify(usedCards).indexOf(JSON.stringify(actualCard)) !== -1) {
                console.log('if');
                _i--;
            } else {
                hand[_i] = actualCard;
                usedCards.push(hand[_i]);
            }
        }
        players[i] = new _Player.Player(hand);
    }

    /**
     * vegig megyunk az osszes jatekoson, es eldontjuk kinek mije van
     */
    players.forEach(function (player, index) {
        document.querySelector('body').innerHTML += '<div class="result result' + index + '"></div>';
        document.querySelector('body').innerHTML += '<div class="hand' + index + '"></div>';

        var handColors = player.getHandColors(),
            handValues = player.getHandValues(),


        //DOM elements
        result = document.querySelector('.result' + index),
            handElement = document.querySelector('.hand' + index);

        player.hand.forEach(function (card) {
            handElement.innerHTML += card.createHandString(_templateObject, card.getAliasValue(), card.getColor());
        });

        //flush detektalas
        var flush = false;
        if (handColors[0] === handColors[4]) {
            flush = true;
        }

        //sor detektalas
        var isUnique = true,
            duplicatums = [];

        //ha sor van, akkor a tomb uniqe
        for (var _i2 = 0; _i2 < 4; _i2++) {
            if (handValues[_i2 + 1] == handValues[_i2]) {
                isUnique = false;
                duplicatums.push(handValues[_i2]);
            }
        }

        if (flush) {
            if (isUnique && handValues[0] === 10 && handValues[4] === 14) {
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

        if (isUnique && (handValues[4] - handValues[0] === 4 || handValues[4] === 14 && handValues[3] === 5)) {
            result.innerHTML = 'Straight ';
            player.rank += 100000 + handValues[0];
            // result.innerHTML += 'Rank: ' + player.rank;
            if (flush) {
                player.rank += 50000 + handValues[0];
                result.innerHTML = 'Straightflush ';
                // result.innerHTML += 'Rank: ' + player.rank;
            }
            return false;
        }

        duplicatums.sort(utils.valueSort);

        if (duplicatums.length === 3) {
            if (duplicatums[0] !== duplicatums[2]) {
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
        if (!isUnique) {
            duplicatums.forEach(function (value, key) {
                if (value === duplicatums[key + 1]) {
                    result.innerHTML += utils.getAlias(value) + " three of a kind ";
                    player.rank += 50000 + value * value * 100;
                } else if (value !== duplicatums[key - 1]) {
                    player.rank += 20000 + value * value * 25;
                    result.innerHTML += utils.getAlias(value) + " pair ";
                }
            });

            // result.innerHTML += 'Rank: ' + player.rank;
        } else if (!flush) {
            result.innerHTML = utils.getAlias(handValues[4]) + ' high card ';
            // result.innerHTML += 'Rank: ' + player.rank;
            return false;
        }
    });

    //a beallitott rankok alapjan kiosztjuk a helyeket
    utils.givePlaces(players);
    players.forEach(function (player, index) {
        var result = document.querySelector('.result' + index);
        result.innerHTML += ', Place: ' + player.place;
    });
}

},{"./model/Card.js":1,"./model/Player.js":2}]},{},[3]);
