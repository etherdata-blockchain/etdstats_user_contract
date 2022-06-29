//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

/**
 * Store user password in a secure manner.
 */
contract User {
    // store the user info based on the address
    mapping(address => string) internal _info;

    // store list of users address
    address[] internal _users;

    // store the secret with user's address
    function updateUser(string memory secret) public {
        string memory value = _info[msg.sender];
        if (bytes(value).length == 0) {
            _users.push(msg.sender);
        }
        _info[msg.sender] = secret;
    }

    // get user info based on the address
    function getUser(address user) public view returns (string memory) {
        return _info[user];
    }

    // get user count
    function getUserCount() public view returns (uint256) {
        return _users.length;
    }

    // get list of user addresses in range of [start, end)
    function getUserAddressesInRange(uint256 start, uint256 end)
        public
        view
        returns (address[] memory)
    {
        uint256 max = end;
        if (max > _users.length) {
            max = _users.length;
        }
        uint256 itemCount = max - start;
        address[] memory results = new address[](itemCount);
        uint256 index = 0;
        for (uint256 i = start; index < itemCount; i++) {
            results[index] = _users[i];
            index += 1;
        }
        return results;
    }
}
