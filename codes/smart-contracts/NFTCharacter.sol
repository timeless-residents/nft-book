// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCharacter is ERC721, ERC721Enumerable, Ownable {
    struct Character {
        uint256 level;
        uint256 power;
    }

    mapping(uint256 => Character) private _characters;

    constructor() ERC721("NFTCharacter", "NCR") {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
        _characters[tokenId] = Character(1, 10);
    }

    function levelUp(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        
        Character storage character = _characters[tokenId];
        character.level++;
        character.power += 10;
    }

    function getCharacter(uint256 tokenId) public view returns (uint256, uint256) {
        require(_exists(tokenId), "Token does not exist");
        Character memory character = _characters[tokenId];
        return (character.level, character.power);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}