// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCharacter.sol";

contract BattleSystem {
    NFTCharacter private _nftCharacter;

    constructor(address nftCharacterAddress) {
        _nftCharacter = NFTCharacter(nftCharacterAddress);
    }

    function battle(uint256 tokenId1, uint256 tokenId2) public {
        require(_nftCharacter.ownerOf(tokenId1) == msg.sender || _nftCharacter.ownerOf(tokenId2) == msg.sender, "Not the owner of characters");
        
        (uint256 level1, uint256 power1) = _nftCharacter.getCharacter(tokenId1);
        (uint256 level2, uint256 power2) = _nftCharacter.getCharacter(tokenId2);
        
        uint256 totalPower1 = level1 * power1;
        uint256 totalPower2 = level2 * power2;
        
        if (totalPower1 > totalPower2) {
            _nftCharacter.levelUp(tokenId1);
        } else if (totalPower1 < totalPower2) {
            _nftCharacter.levelUp(tokenId2);
        }
    }
}