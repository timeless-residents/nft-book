const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTGame", function () {
  let NFTCharacter;
  let CharacterShop;
  let BattleSystem;
  let owner;
  let addr1;
  let addr2;


  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const NFTCharacterFactory = await ethers.getContractFactory("NFTCharacter");
    NFTCharacter = await NFTCharacterFactory.deploy(owner.address);

    const addr = await NFTCharacter.getAddress();
    const CharacterShopFactory = await ethers.getContractFactory("CharacterShop");
    CharacterShop = await CharacterShopFactory.deploy(addr, ethers.parseEther("0.1"));

    const addrCharacterShop = await CharacterShop.getAddress();

    await NFTCharacter.setCharacterShop(addrCharacterShop);

    const BattleSystemFactory = await ethers.getContractFactory("BattleSystem");
    BattleSystem = await BattleSystemFactory.deploy(addr);

    const addrBattleSystem = await BattleSystem.getAddress();
    await NFTCharacter.approveCaller(addrBattleSystem, true);

  });

  it("should mint a character", async function () {
    await NFTCharacter.mint(addr1.address, 0);
    expect(await NFTCharacter.ownerOf(0)).to.equal(addr1.address);
  });

  it("should buy a character", async function () {
    await CharacterShop.connect(addr1).buyCharacter({ value: ethers.parseEther("0.1") });
    expect(await NFTCharacter.ownerOf(0)).to.equal(addr1.address);
  });

  it("should level up after battle", async function () {
    await NFTCharacter.mint(addr1.address, 0);
    await NFTCharacter.mint(addr2.address, 1);
    await BattleSystem.connect(addr1).battle(0, 1);
    const [level0, power0] = await NFTCharacter.getCharacter(0);
    const [level1, power1] = await NFTCharacter.getCharacter(1);
    expect(level0).to.equal(1);
    expect(power0).to.equal(12);
    expect(level1).to.equal(1);
    expect(power1).to.equal(10);
    await BattleSystem.connect(addr1).battle(0, 1);
    const [level01, power01] = await NFTCharacter.getCharacter(0);
    const [level11, power11] = await NFTCharacter.getCharacter(1);
    expect(level01).to.equal(2);
    expect(power01).to.equal(22);
    expect(level11).to.equal(1);
    expect(power11).to.equal(10);
  });
});
