(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var colors = ['diamonds', 'spades', 'heart', 'clubs'];

var ranks = {
    'ROYALFLUSH': 350000,
    'FLUSH': 120000,
    'STRAIGHT': 100000,
    'STRAGIHTFLUSH': 50000,
    'FULLHOUSE': 150000,
    'POKER': 200000,
    "THREEOFAKIND": 50000,
    'PAIR': 20000
};

exports.colors = colors;
exports.ranks = ranks;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

var _constants = require("./constants.js");

var _utils = require("./utils.js");

_utils.utils.ready(main);

function main() {

    //todo: feluleten lehessen megadni a jatekosok szamat
    var numberOfPlayers = 4,
        players = _utils.utils.deal(numberOfPlayers);

    if (numberOfPlayers > 10) {
        alert('Too many players!');
        return false;
    }

    //vegig megyunk az osszes jatekoson, es eldontjuk kinek mije van
    players.forEach(function (player, index) {
        _utils.utils.renderPlayerHand(player, index);

        var handColors = player.getHandColors(),
            handValues = player.getHandValues(),
            result = document.querySelector('.result' + index);

        var flush = _utils.utils.isFlush(handColors),
            duplicatums = [],
            isUnique = _utils.utils.isUnique(handValues, duplicatums);

        if (flush) {
            if (_utils.utils.isRoyal(handValues, isUnique)) {
                result.innerHTML = 'Royal flush! ';
                player.rank += _constants.ranks.ROYALFLUSH;
                return false;
            } else {
                result.innerHTML = 'Flush ';
                player.rank += _constants.ranks.FLUSH + handValues[0];
            }
        }

        if (_utils.utils.isStraight(handValues, isUnique)) {
            result.innerHTML = 'Straight ';
            player.rank += _constants.ranks.STRAIGHT + handValues[0];
            if (flush) {
                result.innerHTML = 'Straightflush ';
                player.rank += _constants.ranks.STRAGIHTFLUSH + handValues[0];
            }
            return false;
        }

        duplicatums.sort(_utils.utils.valueSort);

        if (_utils.utils.isFullHouse(duplicatums)) {
            result.innerHTML = 'Full house! ';
            player.rank += _constants.ranks.FULLHOUSE + duplicatums[0] + duplicatums[2];
            return false;
        }

        if (_utils.utils.isPoker(duplicatums)) {
            result.innerHTML = 'Four of a kind (poker)! ';
            player.rank += _constants.ranks.POKER + duplicatums[0];
            return false;
        }

        //parok keresese
        if (!isUnique) {
            duplicatums.forEach(function (value, key) {
                if (value === duplicatums[key + 1]) {
                    result.innerHTML += _utils.utils.getAlias(value) + " three of a kind ";
                    player.rank += _constants.ranks.THREEOFAKIND + value * value * 100;
                } else if (value !== duplicatums[key - 1]) {
                    player.rank += _constants.ranks.PAIR + value * value * 25;
                    result.innerHTML += _utils.utils.getAlias(value) + " pair ";
                }
            });
        } else if (!flush) {
            result.innerHTML = _utils.utils.getAlias(handValues[4]) + ' high card ';
            return false;
        }
    });

    //a beallitott rankok alapjan kiosztjuk a helyeket
    _utils.utils.givePlaces(players);
    players.forEach(function (player, index) {
        var result = document.querySelector('.result' + index);
        result.innerHTML += ', Place: ' + player.place;
    });
}

},{"./constants.js":1,"./utils.js":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.utils = undefined;

var _templateObject = _taggedTemplateLiteral(["<div class=\"result result", "\"></div>"], ["<div class=\"result result", "\"></div>"]),
    _templateObject2 = _taggedTemplateLiteral(["<div class=\"hand", "\"></div>"], ["<div class=\"hand", "\"></div>"]),
    _templateObject3 = _taggedTemplateLiteral(["Value: ", " Color: ", "<br/>"], ["Value: ", " Color: ", "<br/>"]);

var _Card = require("./model/Card.js");

var _Player = require("./model/Player.js");

var _constants = require("./constants.js");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var utils = {
    valueSort: function valueSort(a, b) {
        return a - b;
    },
    /**
     * A 10.nel nagyobb lapokhoz betujeket tarsit
     * @param value
     * @returns {*}
     */
    getAlias: function getAlias(value) {
        if (value > 10) {
            value === 11 ? value = 'J' : value === 12 ? value = 'Q' : value === 13 ? value = 'K' : value = 'A';
        }
        return value;
    },
    /**
     * Adott intervallumban visszaad egy random egesz szamot
     *
     * @param min
     * @param max
     * @returns {*}
     */
    getRandomInt: function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * jQuery readyhez hasonlo mukodes
     * @param fn
     */
    ready: function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    },
    /**
     * Rank alapjan sorba rakjuk a jatekosokat
     * @param players
     */
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
    },
    /**
     * osztas
     * @returns {Array}
     */
    deal: function deal(numberOfPlayers) {
        var players = [],
            usedCards = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            var hand = [];
            for (var _i = 0; _i < 5; _i++) {
                var actualValue = this.getRandomInt(2, 14),
                    actualColor = _constants.colors[this.getRandomInt(0, 3)],
                    actualCard = new _Card.Card(actualValue, actualColor);

                if (JSON.stringify(usedCards).indexOf(JSON.stringify(actualCard)) !== -1) {
                    _i--;
                } else {
                    hand[_i] = actualCard;
                    usedCards.push(hand[_i]);
                }
            }
            players.push(new _Player.Player(hand));
        }

        return players;
    },

    renderPlayerHand: function renderPlayerHand(player, index) {
        document.querySelector('body').innerHTML += utils.createInsertString(_templateObject, index);
        document.querySelector('body').innerHTML += utils.createInsertString(_templateObject2, index);
        var handElement = document.querySelector('.hand' + index);
        player.hand.forEach(function (card) {
            handElement.innerHTML += card.createHandString(_templateObject3, card.getAliasValue(), card.getColor());
        });
    },

    isFlush: function isFlush(handColors) {
        return handColors[0] === handColors[4];
    },

    isRoyal: function isRoyal(handValues, isUnique) {
        return isUnique && handValues[0] === 10 && handValues[4] === 14;
    },

    isStraight: function isStraight(handValues, isUnique) {
        return isUnique && (handValues[4] - handValues[0] === 4 || handValues[4] === 14 && handValues[3] === 5);
    },

    isFullHouse: function isFullHouse(duplicatums) {
        return duplicatums.length === 3 && duplicatums[0] !== duplicatums[2];
    },

    isPoker: function isPoker(duplicatums) {
        return duplicatums.length === 3 && !this.isFullHouse();
    },

    /**
     * @param {Array} strings
     * @param {Array} values
     * @returns {string}
     */
    createInsertString: function createInsertString(strings) {
        var result = "";
        result += strings[0];
        result += arguments.length <= 1 ? undefined : arguments[1];
        result += strings[1];
        return result;
    },
    /**
     * @param {Array} handValues
     * @param {Array} duplicatums
     * @returns {boolean}
     */
    isUnique: function isUnique(handValues, duplicatums) {
        var isUnique = true;
        handValues.forEach(function (value, i) {
            if (!!handValues[i + 1] && handValues[i + 1] == value) {
                isUnique = false;
                duplicatums.push(value);
            }
        });
        return isUnique;
    }
};

exports.utils = utils;

},{"./constants.js":1,"./model/Card.js":2,"./model/Player.js":3}]},{},[4]);
