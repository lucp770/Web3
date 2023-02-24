require('dotenv').config()
const {ethers} = require("ethers");
const API_KEY = process.env.API_KEY;

const endpoint = 'https://goerli.infura.io/v3/'+API_KEY;

//set up the provider

const provider = new ethers.providers.JsonRpcProvider(endpoint);

//set the address to get balance from
const address = process.env.RECEIVER_PUBLIC_KEY;



const main = async (address)=>{

	let balance = await provider.getBalance(address);
	balance = await ethers.utils.formatEther(balance);
	return balance;

}

main(address).then(balance =>console.log(balance + ' ETH'));
