// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCharacter.sol";

contract CharacterShop {
    NFTCharacter private _nftCharacter;
    uint256 private _price;
    uint256 private _tokenIdCounter;

    constructor(address nftCharacterAddress, uint256 price) {
        _nftCharacter = NFTCharacter(nftCharacterAddress);
        _price = price;
        _tokenIdCounter = 0;
    }

    function buyCharacter() public payable {
        require(msg.value == _price, "Incorrect payment amount");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _nftCharacter.mint(msg.sender, tokenId);
    }

    function withdraw() public {
        require(msg.sender == _nftCharacter.owner(), "Not the owner");
        payable(msg.sender).transfer(address(this).balance);
    }
}