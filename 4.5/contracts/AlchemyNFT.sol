// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AlchemyNFT is ERC721URIStorage {
    uint256 private _tokenIdCounter;
    mapping(uint256 => bytes32) private _tokenURIsHash;

    constructor() ERC721("AlchemyNFT", "ALCH") {
        _tokenIdCounter = 0;
    }

    function mintNFT(address recipient, string memory tokenURI, bytes32 metadataHash) public returns (uint256) {
        _tokenIdCounter += 1;
        uint256 newItemId = _tokenIdCounter;
        
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setTokenURIHash(newItemId, metadataHash);

        return newItemId;
    }

    function _setTokenURIHash(uint256 tokenId, bytes32 metadataHash) internal {
        _tokenURIsHash[tokenId] = metadataHash;
    }

    function getTokenURIHash(uint256 tokenId) public view returns (bytes32) {
        return _tokenURIsHash[tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
