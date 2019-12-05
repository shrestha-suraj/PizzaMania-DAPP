var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//After I set provider, I was able to get the account (public key) of the localhost provider
web3.eth.defaultAccount=web3.eth.accounts[9];
const userAccessAccount=web3.eth.defaultAccount;

//Information about contract to create a smart contract reference
const contractAbi=[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quantityOfPizza",
				"type": "uint256"
			}
		],
		"name": "makeTransactionWithPoints",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_company",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_quantityOfPizza",
				"type": "uint256"
			}
		],
		"name": "makeTransactionWithEther",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "refundUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
const contractAddress='0xB2f0daE46e841593E4582e9be980409f90325675';
const contract=web3.eth.contract(contractAbi).at(contractAddress);
console.log(contract);

contract.getUserValue(function(error,message){
    const header_points=document.querySelector("#points_earned");
    if(error){
        header_points.textContent="Error Loading";
    }
    else{
        header_points.textContent=Math.floor(parseFloat(message))+ " Points";
    }
});

function sendPublicKey(){
    return userAccessAccount;
}

function makeTransaction(){
    const companyName=document.querySelector("#companyName").innerHTML;
    const totalPizzaCost=document.querySelector("#totalCost").innerHTML.split(" ")[1];
    const pizzaQuantity=parseInt(document.querySelector("#quantity").value);
    //Checking balance and comparing it to transaction amount to see if purchase can be made
    const balance=web3.eth.getBalance(userAccessAccount).toNumber();
    const amount=parseFloat(web3.toWei(totalPizzaCost,"ether"));
    console.log("Balance Before Transaction is: "+balance);
    if(amount>balance){
        alert("You don't have enough balance to perform this transaction.\nPlease deposite ether to your account.");
    }
    else{
        let trascation=contract.makeTransactionWithEther(companyName,pizzaQuantity,{"to":contractAddress,"from":userAccessAccount,"value":amount});
        console.log("If transaction scucessful this message should popup");
        location.reload();
    }
    console.log("Balance after transaction is: "+web3.eth.getBalance(userAccessAccount).toNumber());
}