import {Card} from "./model/Card.js";
import {Player} from "./model/Player.js";
import {colors} from "./constants.js";

let utils = {
    valueSort: function(a, b) {
        return a - b;
    },
    /**
     * A 10.nel nagyobb lapokhoz betujeket tarsit
     * @param value
     * @returns {*}
     */
    getAlias: function(value) {
        if(value > 10) {
            value === 11 ? value = 'J' : (value === 12 ? value = 'Q' : (value === 13 ? value = 'K' : value = 'A'));
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
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * jQuery readyhez hasonlo mukodes
     * @param fn
     */
    ready: function(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    },
    /**
     * Rank alapjan sorba rakjuk a jatekosokat
     * @param players
     */
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
    },
    /**
     * osztas
     * @returns {Array}
     */
    deal: function(numberOfPlayers) {
        let players = [],
            usedCards = [];
        for(let i = 0; i < numberOfPlayers; i++) {
            let hand = [];
            for (let i = 0; i < 5; i++) {
                let actualValue = this.getRandomInt(2, 14),
                    actualColor = colors[this.getRandomInt(0, 3)],
                    actualCard = new Card(actualValue, actualColor);

                if (JSON.stringify(usedCards).indexOf(JSON.stringify(actualCard)) !== -1) {
                    i--;
                } else {
                    hand[i] = actualCard;
                    usedCards.push(hand[i]);
                }
            }
            players.push(new Player(hand));
        }

        return players;
    },

    renderPlayerHand: function (player, index) {
        document.querySelector('body').innerHTML += utils.createInsertString`<div class="result result${index}"></div>`;
        document.querySelector('body').innerHTML += utils.createInsertString`<div class="hand${index}"></div>`;
        let handElement = document.querySelector('.hand' + index);
        player.hand.forEach(card => {
            handElement.innerHTML += card.createHandString`Value: ${card.getAliasValue()} Color: ${card.getColor()}<br/>`;
        });
    },

    isFlush: function(handColors) {
        return handColors[0] === handColors[4];
    },

    isRoyal: function(handValues, isUnique) {
        return isUnique && handValues[0] === 10 && handValues[4] === 14;
    },

    isStraight: function(handValues, isUnique) {
        return isUnique && ((handValues[4] - handValues[0] === 4) || (handValues[4] === 14 && handValues[3] === 5));
    },

    isFullHouse: function(duplicatums) {
        return duplicatums.length === 3 && duplicatums[0] !== duplicatums[2];
    },

    isPoker: function (duplicatums) {
        return duplicatums.length === 3 && !this.isFullHouse();
    },

    /**
     * @param {Array} strings
     * @param {Array} values
     * @returns {string}
     */
    createInsertString: function(strings, ...values) {
        let result = "";
        result += strings[0];
        result += values[0];
        result += strings[1];
        return result;
    },
    /**
     * @param {Array} handValues
     * @param {Array} duplicatums
     * @returns {boolean}
     */
    isUnique: function(handValues, duplicatums) {
        let isUnique = true;
        handValues.forEach((value, i) => {
            if (!!handValues[i + 1] && handValues[i + 1] == value) {
                isUnique = false;
                duplicatums.push(value);
            }
        });
        return isUnique;
    }
};

export {utils};