pragma solidity ^0.5.11;

contract PizzaMania{
    address payable contractOwner;
    address payable payToAddress;
    mapping(string=>address payable) companies;
    mapping(address=>uint256) users;
    uint256 marginalTransaction;
    //The constructor is responsible to set company addresses in order to perform the transactions
    constructor() public{
        contractOwner = msg.sender;
        companies["dominos"] = 0x05c5B304Cd7204f75681E6af27B5f2B324CF59a8;
        companies["papajohns"] = 0x8773237045397BE6583B1ec54B6b8bDD57A555F1;
        companies["marcos"] = 0xe271aF4bD4635ED4c489Aff38B8f8D90Ad35b8fA;
        //Minimum ether needed to perform the transaction is $8 or 0.055 ETH or 55000000000000000 Wei
        marginalTransaction = 55000000000000000;
    }
    //Creating a modifier called owner such that function with its implement can only be called by owner
    modifier owner(){
        require(msg.sender == contractOwner,"Unauthorized User");
        _;
    }

    //Getting User Points. But first checks if the user exists on the users record
    function getUserValue() public view returns (uint){
        if ( users[msg.sender] == 0){
            users[msg.sender] == 1;
        }
        //By defuault if an address is not present in the mapping 0 is assumed
        //Hence we start counting points from 1 but return the value by decreasing by 1
        return users[msg.sender]-1;
    }
    //Creating points update for users if they buy a pizza or pizzas
    //This function can only be called from the function that handles the transaction i.e. makeTransactionWithEther
    //This function is set to private in a sense that no one can call it besides the makeTransactionWithEther function
    function setUserValue(uint _points) private {
        if ( users[msg.sender] == 0){
            users[msg.sender] == 1;
        }
        users[msg.sender] += _points;
    }
    //This is make transaction function.
    //This function first takes input of company name and quantity of pizza the user is ordering.
    //If the transactAmount and the marginalPrice doesnot match this will not perform the transaction
    //It is also kind of a fail safe to prevent unnecessary people from trying to increase points wihtout
    //valid transaction.
    //So, if you try to tangle the function by providing less ether and more quantity, it won't match up
    //This means you will loose money and won't get points too if try to perform fraud transaction
    //This redues the need of the pizza comany to sign the points to users.
    function makeTransactionWithEther(string memory _company ,uint256 _quantityOfPizza) public payable returns (string memory){
        uint256 transactAmount = msg.value;
        uint256 marginalPrice = _quantityOfPizza*marginalTransaction;
        if(transactAmount > marginalPrice){
            payToAddress = companies[_company];
            payToAddress.transfer(msg.value);
            setUserValue(_quantityOfPizza);
            return "Transaction with ether was successful";
        }
        else{
            return "Faulty Transaction Detected With Ether";
        }
    }
    //This function makes transaction for pizza using the points. This function only gets triggred if all the conditions
    //are met in the frontend part part of the code
    function makeTransactionWithPoints(uint256 _quantityOfPizza) public returns(string memory){
        uint256 user_points = users[msg.sender]-1;
        uint256 pizza_ordered_with_points = _quantityOfPizza*10;
        if(user_points > pizza_ordered_with_points){
            users[msg.sender] -= pizza_ordered_with_points;
            return "Transaction with points was successful";
        }
        else{
            return "Faulty Transaction Detected With Points";
        }
    }
    //Refund failsafe if needed. Can only be performed by the owner of the contractOwner
    function refundUser(address payable _userAddress) public owner payable{
        _userAddress.transfer(msg.value);
    }
}
