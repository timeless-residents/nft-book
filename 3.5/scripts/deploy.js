async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const NFTArt = await ethers.getContractFactory("NFTArt");
    const nftArt = await NFTArt.deploy();

    console.log("NFTArt contract deployed to:", nftArt.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });