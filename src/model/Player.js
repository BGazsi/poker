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

export {Player};