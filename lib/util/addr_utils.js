'use strict';

var Base58 = require('../encoding/base58.js');
var Base58Check = require('../encoding/base58check.js');

module.exports = {

    bitcoin_address_to_zcoin: function bitcoin_address_to_zcoin(bitcoin_address) {

        var data = Base58.decode(bitcoin_address.trim());
        if (data.length <= 4)
            return bitcoin_address;

        var temp = data.slice(0, data.length - 4);
        switch (temp[0]) {
            case 0:
                temp[0] = 82;
                break;
            case 5:
                temp[0] = 7;
                break;
            case 128:
                temp[0] = 210;
                break;
            case 111:
                temp[0] = 65;
                break;
            case 196:
                temp[0] = 178;
                break;
            case 239:
                temp[0] = 185;
                break;
        }
        return Base58Check.encode(temp);
    }

};