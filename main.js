const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2021", "Genesis block", "0");
    }

    getLatestBLock(){
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock){
        newBlock.previousHash = this.getLatestBLock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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
socopokoCoin.addNewBlock(new Block(1, "02/01/2021", { amount: 5 }));
socopokoCoin.addNewBlock(new Block(2, "04/01/2021", { amount: 10 }));


console.log(JSON.stringify(socopokoCoin, null, 4));
console.log('Is blockchain valid? ' + socopokoCoin.isChainValid());


socopokoCoin.chain[1].data = { amount: 100 };
socopokoCoin.chain[1].hash = socopokoCoin.chain[1].calculateHash();

console.log(JSON.stringify(socopokoCoin, null, 4));
console.log('Is blockchain valid? ' + socopokoCoin.isChainValid());