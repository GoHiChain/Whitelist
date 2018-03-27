pragma solidity ^0.4.17;


import "./Ownable.sol";

contract WhiteList is Ownable {

    mapping(address => uint) public ContributionLimit;
    mapping(address => bool) public whitelist;

    event WhitelistUpdated(address participant, bool isWhitelisted);
    event Error(string message);

    function addToWhitelist(address _participant)  public onlyOwner returns(bool) {
        if (whitelist[_participant]) {
            return true;
        }
        whitelist[_participant] = true;
        WhitelistUpdated(_participant, true);
        return true;
    }

    function removeFromWhitelist(address _participant)  public onlyOwner  returns(bool) {
        if (!whitelist[_participant]) {
            return true;
        }
        whitelist[_participant] = false;
        WhitelistUpdated(_participant, false);
        return true;
    }

    function listed(address _participant) public view returns(bool) {
	return whitelist[_participant];
    }

}

