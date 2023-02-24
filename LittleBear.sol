pragma solidity 0.8.6;

contract LittleBear {

    // define an event to be called latter
    event LogMsg(string Message);

    // state variable public acessible
    string public storedMsg;

    // the constructor is called only when the contract is deployed
    constructor(){
        // defines a value to the state variable.
        storedMsg = "Hellow Little Bear";

        // emit the event to the blockchain
        emit LogMsg(storedMsg);

    }

    // define a function to change the msg
    // is defined as public to be acessible outside the contract
    // when a function is public it can be called by the contract, by other contracts
    // ** but also can be called by EOAs via transactions.

    function updateMsg(string memory newMsg) public{
        storedMsg = newMsg;
        // emit the Logmsg event to the blockchain to 
        emit LogMsg(storedMsg);
    }

}