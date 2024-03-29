async function main() {
    const AlchemyNFT = await ethers.getContractFactory("AlchemyNFT");
    const alchemyNFT = await AlchemyNFT.deploy();
    console.log("alchemyNFT deployed to:", await alchemyNFT.getAddress());
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
