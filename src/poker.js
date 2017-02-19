import {ranks} from "./constants.js";
import {utils} from "./utils.js";


utils.ready(main);

function main() {

    //todo: feluleten lehessen megadni a jatekosok szamat
    let numberOfPlayers = 4,
        players = utils.deal(numberOfPlayers);

    if(numberOfPlayers > 10) {
        alert('Too many players!');
        return false;
    }

    //vegig megyunk az osszes jatekoson, es eldontjuk kinek mije van
    players.forEach((player, index) => {
        utils.renderPlayerHand(player, index);

        let handColors = player.getHandColors(),
            handValues = player.getHandValues(),
            result = document.querySelector('.result' + index);

        let flush = utils.isFlush(handColors),
            duplicatums = [],
            isUnique = utils.isUnique(handValues, duplicatums);

        if(flush) {
            if(utils.isRoyal(handValues, isUnique)) {
                result.innerHTML = 'Royal flush! ';
                player.rank += ranks.ROYALFLUSH;
                return false;
            } else {
                result.innerHTML = 'Flush ';
                player.rank += ranks.FLUSH + handValues[0];
            }
        }

        if(utils.isStraight(handValues, isUnique)) {
            result.innerHTML = 'Straight ';
            player.rank += ranks.STRAIGHT + handValues[0];
            if(flush) {
                result.innerHTML = 'Straightflush ';
                player.rank += ranks.STRAGIHTFLUSH + handValues[0];
            }
            return false;
        }

        duplicatums.sort(utils.valueSort);

        if(utils.isFullHouse(duplicatums)) {
            result.innerHTML = 'Full house! ';
            player.rank += ranks.FULLHOUSE + duplicatums[0] + duplicatums[2];
            return false;
        }

        if(utils.isPoker(duplicatums)) {
            result.innerHTML = 'Four of a kind (poker)! ';
            player.rank += ranks.POKER + duplicatums[0];
            return false;
        }

        //parok keresese
        if(!isUnique) {
            duplicatums.forEach((value, key) => {
                if(value === duplicatums[key + 1]) {
                    result.innerHTML += utils.getAlias(value) + " three of a kind ";
                    player.rank += ranks.THREEOFAKIND + (value * value * 100);
                } else if(value !== duplicatums[key - 1]){
                    player.rank += ranks.PAIR + (value * value * 25);
                    result.innerHTML += utils.getAlias(value) + " pair ";
                }
            });
        } else if(!flush) {
            result.innerHTML = utils.getAlias(handValues[4]) + ' high card ';
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