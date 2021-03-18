const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('bf5b65151fd618b0a2ee24a87a793857edc08a485e982d1171b8201e7298d1a0')
const myWalletAddress = myKey.getPublic('hex');



let socopokoCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
socopokoCoin.addTransaction(tx1);


console.log('\nStarting the miner...');
socopokoCoin.minePendingTransactions(myWalletAddress, socopokoCoin.getLatestBLock().hash);
console.log(socopokoCoin.chain)
console.log('\nBalance of myWalletAddress is ', socopokoCoin.getBalanceOfAddress(myWalletAddress));

socopokoCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid? ', socopokoCoin.isChainValid());


// console.log('\nStarting the miner again...');

// socopokoCoin.minePendingTransactions(myWalletAddress, socopokoCoin.getLatestBLock().hash);
// console.log(socopokoCoin.chain)
// console.log('\nBalance of myWalletAddress is ', socopokoCoin.getBalanceOfAddress(myWalletAddress));

