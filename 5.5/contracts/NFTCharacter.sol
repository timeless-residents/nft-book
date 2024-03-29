// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCharacter is ERC721, ERC721Enumerable, Ownable {
    struct Character {
        uint256 level;
        uint256 power;
    }

    mapping(uint256 => Character) private _characters;
    mapping(address => bool) private _approvedCallers;
    address public characterShop;
    constructor(address initialOwner)
        ERC721("NFTCharacter", "CTK")
        Ownable(initialOwner)
    {}

    modifier onlyOwnerOrApprovedCaller(uint256 tokenId) {
        require(
            ownerOf(tokenId) == msg.sender || _approvedCallers[msg.sender],
            "Not the owner or approved caller"
        );
        _;
    }

    // The following functions are overrides required by Solidity.
    function mint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
        _characters[tokenId] = Character(1, 10);
    }

    function mintFromCharacterShop(address to, uint256 tokenId) public {
        require(msg.sender == characterShop, "Only CharacterShop can mint");
        _safeMint(to, tokenId);
        _characters[tokenId] = Character(1, 10);
    }

    function approveCaller(address caller, bool approved) public onlyOwner {
        _approvedCallers[caller] = approved;
    }

    function levelUp(uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender || _approvedCallers[msg.sender],
            "Caller is not owner nor approved"
        );
        Character storage character = _characters[tokenId];
        character.level++;
        character.power += 10;
    }
    function powerUp(uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender || _approvedCallers[msg.sender],
            "Caller is not owner nor approved"
        );
        Character storage character = _characters[tokenId];
        character.power += 2;
    }

    function getCharacter(uint256 tokenId) public view returns (uint256, uint256) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        Character memory character = _characters[tokenId];
        return (character.level, character.power);
    }

    function setCharacterShop(address _characterShop) public onlyOwner {
        characterShop = _characterShop;
    }


    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}