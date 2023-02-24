require('dotenv').config()

//criando uma transação via goerlick.

const {ethers} = require("ethers");
const API_KEY = process.env.API_KEY;

const endpoint = 'https://goerli.infura.io/v3/'+API_KEY;

//private key associated with account sender.
const PK = process.env.PRIVATE_KEY

const sender = process.env.SENDER_PUBLIC_KEY
const receiver = process.env.RECEIVER_PUBLIC_KEY

//set up the provider (I'm using a RPC provider from infura)
const provider = new ethers.providers.JsonRpcProvider(endpoint);

//lets create a new wallet

const wallet = new ethers.Wallet(PK, provider);

const main = async ()=>{

	console.log('Balances before transaction: ');
	let balance1 = await provider.getBalance(sender);
	balance1 = await ethers.utils.formatEther(balance1);

	let balance2 = await provider.getBalance(receiver);
	balance2 = await ethers.utils.formatEther(balance2);

	console.log('\n Balance sender before: ', balance1);
	console.log('\n Balance receiver before', balance2);

	//define a transaction object:
	const tx = {
		to: receiver,
		value: ethers.utils.parseEther("0.01"), 
	}

	//await to transaction being sent
	const transaction = await wallet.sendTransaction(tx);
	console.log('transaction confirmation: ', transaction);

	//await now the inclusion of the transaction in the blockchain (mined)
	const confirmedTransaction = await transaction.wait()

	console.log('\n confirmed transaction: ', confirmedTransaction);

	console.log('Balances after transaction: ');
	balance1 = await provider.getBalance(sender);
	balance1 = await ethers.utils.formatEther(balance1);

	balance2 = await provider.getBalance(receiver);
	balance2 = await ethers.utils.formatEther(balance2);

	console.log('\n Balance sender after: ', balance1);
	console.log('\n Balance receiver after', balance2);

}

main()
