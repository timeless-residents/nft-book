// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "./NFTCharacter.sol";

contract CharacterShop {
    NFTCharacter private _nftCharacter;
    uint256 private _price;
    uint256 private _tokenIdCounter;

    constructor(address nftCharacterAddress, uint256 initialPrice) {
        _nftCharacter = NFTCharacter(nftCharacterAddress);
        _price = initialPrice;
        _tokenIdCounter = 0;
    }
    function price() public view returns (uint256) {
        return _price;
    }

    function buyCharacter() public payable {
        require(msg.value == _price, "Incorrect payment amount");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _nftCharacter.mintFromCharacterShop(msg.sender, tokenId);
    }

    function withdraw() public {
        require(msg.sender == _nftCharacter.owner(), "Not the owner");
        payable(msg.sender).transfer(address(this).balance);
    }
}