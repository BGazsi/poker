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

// export {Card};