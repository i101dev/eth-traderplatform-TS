//
//
const hre = require("hardhat");
//
// const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";
//
function to_ETH(x) {
    return ethers.parseUnits(x.toString(), "ether");
}
function to_NUM(x) {
    return parseInt(ethers.formatUnits(x, "ether"));
}
function rInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const wait = (seconds) => {
    const milliseconds = seconds * 1000;
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
//
//
async function main() {
    // await Trade();
    await Mint();
}
//
//
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//
//
async function Trade() {
    //
    //
    const [deployer, acct1, acct2, acct3] = await ethers.getSigners();
    //
    //
    const Exchange_OBJ = await ethers.getContractFactory("MyExchange");
    const myExchange = await Exchange_OBJ.deploy(deployer, 10);
    await myExchange.waitForDeployment();
    //
    //
    const MyToken_OBJ = await ethers.getContractFactory("MyToken");
    const tokenSupply = to_ETH(1000000);
    const tokenSymbols = [
        { name: "Blue", sym: "BLU" },
        { name: "Green", sym: "GRN" },
        { name: "Red", sym: "RED" },
        { name: "Yellow", sym: "YLW" },
    ];
    //
    //
    for (let i = 0; i < tokenSymbols.length; i++) {
        //
        const { name, sym } = tokenSymbols[i];
        //
        const myToken = await MyToken_OBJ.deploy(name, sym, tokenSupply);
        await myToken.waitForDeployment();
        //
        const tokenAddr = myToken.target;
        //
        const newTokenListingTxn = await myExchange.listToken(tokenAddr, sym);
        const receipt = await newTokenListingTxn.wait();
        //
        const token_startQty1 = rInt(500, 1000);
        const token_startQty2 = rInt(500, 1000);
        const token_startQty3 = rInt(500, 1000);
        //
        await myToken.transfer(acct1.address, to_ETH(token_startQty1));
        await myToken.transfer(acct2.address, to_ETH(token_startQty2));
        await myToken.transfer(acct3.address, to_ETH(token_startQty3));
        //
        console.log(`*** >>> ${sym} deployed: ${tokenAddr}`);
        //
        if (receipt.status === 1) {
            console.log(`*** >>> ${sym} listed on exchange\n`);
        } else {
            console.log(`*** >>> ${sym} failed to list\n`);
        }
    }
    //
    //
    console.log(`\n*** >>> Deployed exchange contract at: ${myExchange.target}\n`);
    console.log("\n*** >>> Deployment fini\n");
    //
    //
}
async function Mint() {
    //
    const [deployer] = await ethers.getSigners();
    //
    const exchangeName = "MyExchange";
    //
    const ercName = "MyToken";
    const ercSymbol = "MTK";
    //
    const nftName_faction = "FactionNFT";
    const nftSymbol_faction = "FNFT";
    const baseTokenURI_i101 = "faction.app";
    //
    // -------------------------------------
    const gameNftCost = 1;
    const nftName_game = "GameNFT";
    const nftSymbol_game = "GNFT";
    const baseTokenURI_oligarch = "game.app";
    // -------------------------------------
    //
    const nftFactory_factopm = await ethers.getContractFactory(nftName_faction);
    const nftContract_faction = await nftFactory_factopm.deploy(
        nftName_faction,
        nftSymbol_faction,
        ercName,
        ercSymbol,
        baseTokenURI_i101
    );
    await nftContract_faction.waitForDeployment();
    //
    const exchangeFactory = await ethers.getContractFactory(exchangeName);
    const exchangeContract = await exchangeFactory.deploy(deployer, 10);
    await exchangeContract.waitForDeployment();
    //
    //
    const tokenAddress = await nftContract_faction.getMyTokenAddress();
    const listTokenTxn = await exchangeContract.listToken(tokenAddress, ercSymbol);
    const tokenReceipt = await listTokenTxn.wait();
    //
    //
    if (tokenReceipt.status === 1) {
        console.log("Token listed on exchange");
    } else {
        console.log("FAILED TOKEN RECEIPT --- ", tokenReceipt);
    }
    //
    //
    const nftFactory_game = await ethers.getContractFactory(nftName_game);
    const nftContract_game = await nftFactory_game.deploy(
        nftName_game,
        nftSymbol_game,
        baseTokenURI_oligarch,
        tokenAddress
    );
    await nftContract_game.waitForDeployment();
    //
    //
    console.log(`\n*** >>> Deployed [MyToken] contract at: ${tokenAddress}`);
    console.log(`*** >>> Deployed [GameNFT] contract at: ${nftContract_game.target}`);
    console.log(
        `*** >>> Deployed [FactionNFT] contract at: ${nftContract_faction.target}`
    );
    console.log(
        `*** >>> Deployed [MyExchange] contract at: ${exchangeContract.target}\n`
    );
}
