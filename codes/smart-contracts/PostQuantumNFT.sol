pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./lattigo/sign.sol";
import "./lattigo/verify.sol";

contract PostQuantumNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("PostQuantumNFT", "PQNFT") {}

    function mint(address to, uint256 tokenId, bytes memory signature) public {
        require(Lattigo.verify(msg.sender, tokenId, signature), "Invalid signature");
        
        _tokenIds.increment();
        _safeMint(to, tokenId);
    }

    function transfer(address to, uint256 tokenId, bytes memory signature) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
        require(Lattigo.verify(msg.sender, tokenId, signature), "Invalid signature");
        
        _transfer(msg.sender, to, tokenId);
    }
}