const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTArt", function () {
  let NFTArt;
  let nftArt;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // NFTArtコントラクトをデプロイする
    NFTArt = await ethers.getContractFactory("NFTArt");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nftArt = await NFTArt.deploy();
  });

  describe("ミントと所有権のテスト", function () {
    it("NFTをミントし、所有権を確認する", async function () {
      // addr1にNFTをミントする
      await nftArt.connect(addr1).mintNFT(addr1.address, "https://example.com/nft1");

      expect(await nftArt.ownerOf(1)).to.equal(addr1.address);
    });

    it("トークンURIが正しく設定されていることを確認する", async function () {
      // addr1にNFTをミントし、トークンURIを設定する
      await nftArt.connect(addr1).mintNFT(addr1.address, "https://example.com/nft1");

      expect(await nftArt.tokenURI(1)).to.equal("https://example.com/nft1");
    });

    it("ミント後の総供給量を確認する", async function () {
      await nftArt.connect(addr1).mintNFT(addr1.address, "https://example.com/nft1");
      await nftArt.connect(addr2).mintNFT(addr2.address, "https://example.com/nft2");

      expect(await nftArt.totalSupply()).to.equal(2);
    });
  });
});
