async function main() {
    // ethers オブジェクトを取得
    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    // NFTCharacter コントラクトをデプロイ
    const NFTCharacter = await ethers.getContractFactory("NFTCharacter");
    const nftCharacter = await NFTCharacter.deploy(deployer.address);
    // await nftCharacter.deployed();
    const addrCharacter = await nftCharacter.getAddress();
    console.log("NFTCharacter deployed to:", addrCharacter);

    // CharacterShop コントラクトをデプロイ
    const CharacterShop = await ethers.getContractFactory("CharacterShop");
    const characterShop = await CharacterShop.deploy(addrCharacter, ethers.parseEther("0.1"));
    // await characterShop.deployed();
    const addrCharacterShop = await characterShop.getAddress();
    console.log("CharacterShop deployed to:", addrCharacterShop);

    // BattleSystem コントラクトをデプロイ
    const BattleSystem = await ethers.getContractFactory("BattleSystem");
    const battleSystem = await BattleSystem.deploy(addrCharacter);
    // await battleSystem.deployed();
    const addrBattleSystem = await battleSystem.getAddress();
    console.log("BattleSystem deployed to:", addrBattleSystem);

    // BattleSystem を NFTCharacter の approved caller として設定


    const approveTx0 = await nftCharacter.setCharacterShop(addrCharacterShop);
    await approveTx0.wait();

    const approveTx = await nftCharacter.approveCaller(addrBattleSystem, true);
    await approveTx.wait(); // トランザクションがマイニングされるのを待つ

    console.log(`BattleSystem is now an approved caller of NFTCharacter.`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
