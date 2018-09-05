'use strict';

var should = require('chai').should();
var expect = require('chai').expect;

var bitcore = require('../..');
var errors = bitcore.errors;
var AddrUtils = bitcore.util.AddrUtils;
var Address = bitcore.Address;
var Networks = bitcore.Networks;
var PrivateKey = bitcore.PrivateKey;

var Base58 = bitcore.encoding.Base58 ;
var Base58Check = bitcore.encoding.Base58Check;

describe('Address utils', function() {

  it('can convert bitcoin to zcoin addresses', function() {
    AddrUtils.bitcoin_address_to_zcoin('5HxWvvfubhXpYYpS3tJkw6fq9jE9j18THftkZjHHfmFiWtmAbrj')
      .should.equal('83MZPwUXUazPbpUGPRCh9PqLF5j32kEFp5haa1goBVoWyo1x6Eq');
    AddrUtils.bitcoin_address_to_zcoin('Kwr371tjA9u2rFSMZjTNun2PXXP3WPZu2afRHTcta6KxEUdm1vEw')
      .should.equal('Y5PjzFSVWm2JkgXLuwpcC3nKw9rXxhoWNok7Ai2eqL8KKcy6nWym');
    AddrUtils.bitcoin_address_to_zcoin('L3Hq7a8FEQwJkW1M2GNKDW28546Vp5miewcCzSqUD9kCAXrJdS3g')
      .should.equal('YAqXzog1b24aew6LNUjYVmn4UgZzGQ1L1AgtshFEUPYZFgEsaVQ1');
    AddrUtils.bitcoin_address_to_zcoin('cQ7tSSQDEwaxg9usnnP1Aztqvm9nCQVfNWz9kU2rdocDjknF2vd6')
      .should.equal('UQoqZiwdne7Y4DCPvh4nBbnYVJJZ7orQafM7XwKk7xunXt3yX7CB');
    AddrUtils.bitcoin_address_to_zcoin('1CRj2HyM1CXWzHAXLQtiGLyggNT9WQqsDs')
      .should.equal('aC9BmCQyDzXN3pbdLpCr2dJCHjaVnkarTb');
    AddrUtils.bitcoin_address_to_zcoin('33zbk2aSZYdNbRsMPPt6jgy6Kq1kQreqeb')
      .should.equal('3rfoiFB1yuZ8EJ9XSEYjhwWfaqXdkbRfpb');
    AddrUtils.bitcoin_address_to_zcoin('n4McBrSkw42eYGX5YMACGpkGUJKL3jVSbo')
      .should.equal('TYortrjWGkiLvL76R3qXy4E5X6TwQKXhsV');
  });

  it('can correctly convert zcoin testnet addresses', function() {

    var testnet_addr_str = AddrUtils.bitcoin_address_to_zcoin('mo9ncXisMeAoXwqcV5EWuyncbmCcQN4rVs');
    (new Address(testnet_addr_str, 'testnet', 'pubkeyhash')).network.name.should.equal(Networks.testnet.name);

    testnet_addr_str = AddrUtils.bitcoin_address_to_zcoin('2N2JD6wb56AfK4tfmM6PwdVmoYk2dCKf4Br');
    (new Address(testnet_addr_str, 'testnet', 'scripthash')).network.name.should.equal(Networks.testnet.name);
  });

  it('cat correctly convert zcoin private keys', function() {

    var private_key_str = AddrUtils.bitcoin_address_to_zcoin('5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr');
    (new PrivateKey(private_key_str)).network.name.should.equal(Networks.livenet.name);

    private_key_str = AddrUtils.bitcoin_address_to_zcoin('9213qJab2HNEpMpYNBa7wHGFKKbkDn24jpANDs2huN3yi4J11ko');
    (new PrivateKey(private_key_str)).network.name.should.equal(Networks.testnet.name);

    var data = new Buffer('003c3fa3d4adcaf8f52d5b1843975e122548269937', 'hex');
    console.log(data[0]);

    var temp = data.slice(0, data.length);
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

    var buf = new Buffer(temp);
  });

});

