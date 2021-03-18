const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount; 
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("01/01/2021",'', "0");
    }

    getLatestBLock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress, previousHash){
        let block = new Block(Date.now(), this.pendingTransactions, previousHash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}


let socopokoCoin = new Blockchain();
socopokoCoin.createTransaction(new Transaction('address1', 'address2', 100));
socopokoCoin.createTransaction(new Transaction('address2', 'address1', 50));



console.log('\nStarting the miner...');

socopokoCoin.minePendingTransactions('xaviers-address', socopokoCoin.getLatestBLock().hash);
console.log(socopokoCoin.chain)
console.log('\nBalance of xavier is ', socopokoCoin.getBalanceOfAddress('xaviers-address'));
console.log('\nBalance of address1 is ', socopokoCoin.getBalanceOfAddress('address1'));
console.log('\nBalance of address1 is ', socopokoCoin.getBalanceOfAddress('address2'));



console.log('\nStarting the miner again...');

socopokoCoin.minePendingTransactions('xaviers-address', socopokoCoin.getLatestBLock().hash);
console.log(socopokoCoin.chain)
console.log('\nBalance of xavier is ', socopokoCoin.getBalanceOfAddress('xaviers-address'));
console.log('\nBalance of address1 is ', socopokoCoin.getBalanceOfAddress('address1'));
console.log('\nBalance of address1 is ', socopokoCoin.getBalanceOfAddress('address2'));