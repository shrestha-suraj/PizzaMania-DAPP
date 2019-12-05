pragma solidity ^0.5.11;

contract myContact{
    //Maps user address with the points they have earned
    mapping(address => uint256) userPoints;
    //Maps the comany names with their address for payment process Eg: Dominos=>0x00043423fdsfsdfsa
    mapping(string => address payable) pizzaCompany;
    //Wallet for the comapaines to send money to. All purchases are final and no refunds.. For now
    address payable wallet;
    //Address of the owner of the contract so that only they can make necessary changes to the file
    address contractOwner;

    //Constructor to set the contract owner when the contract is deployed
    constructor() public{
        contractOwner = msg.sender;
    }
    //Modifer to see if a certain transcation is valid when only owner modifier allowes it
    modifier onlyOwner(){
        require(contractOwner == msg.sender, "Sender not Authorized");
        _;
    }
    //Modifier to check it the company wallet is valid that such that ether doesnot go to the wrong account
    // modifier checkWallet(string memory _companyName){
    //     require(pizzaCompany[_companyName] != 0,"Bad Address for Order Transaction");
    //     _;
    // }
    //MODIFIER: To see that if the sender doesnot exist on the mapping
    modifier userDoesnotExists(){
        require(userPoints[msg.sender]==0,"User Already Exists");
        _;
    }
    //FUNCTION: To add a new user to the mapping if the requirents are met i.e. onlyOwner and userDoesnotExist
    function addUsers(uint256) public userDoesnotExists{
        userPoints [msg.sender] = 1;
    }
    //FUCTION: To get the points that user has earned so far.
    function getUserPoints() public view returns(uint256){
        return userPoints[msg.sender];
    }
    //FUNCTION: Increases user points by the number provided
    function increaseUserPoints(uint256 _numOfPizza) public{
        userPoints [msg.sender] += _numOfPizza;
    }
    //FUNCTION: Decreases the user points when they use points to buy the pizza
    function decreaseUserPoints(uint256 _numOfPoints) public{
        userPoints [msg.sender] -= _numOfPoints;
    }
    //FUNCTION: To check if the user satisfies for Pizza from the earned points
    function pizzaWithPoints() public view returns(bool){
        return userPoints[msg.sender]>=10;
    }
    //FUNCTION: Adding new Pizza Company to the mapping so that they can run business. ONLY OWNER CAN DO IT
    function addPizzaCompany(string memory _name, address payable _address) public onlyOwner{
        pizzaCompany [_name] = _address;
    }
    
    //MODIFIER: To check if the address of pizza company coming on the bottom transaction is valid and
    // present in the mapping.
    
    //FUNCTION: PaymentHandlerer assigns wallet to the specific company address and then sends the users ether to the company.
    function paymentHandlerer(string memory _companyName) public payable returns(bool){
        if (pizzaCompany[_companyName] != 0x0000000000000000000000000000000000000000){
            wallet = pizzaCompany[_companyName];
            wallet.transfer(msg.value);
            return true;
        }
        return false;
    }


}
