import * as hre from "hardhat";

import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";

import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Wallet } from "zksync-web3";
import { assert } from "chai";
// load env file
import dotenv from "dotenv";

dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!PRIVATE_KEY) 
    throw "⛔️ Private key not detected! Add it to the .env file!";


export default async function (hre: HardhatRuntimeEnvironment) {
    console.log("Running deploy script for the soulBTV2 contract...");
    // It is assumed that this wallet already has sufficient funds on zkSync
    const wallet = new Wallet(PRIVATE_KEY);
    const deployer = new Deployer(hre, wallet);

    const baseNFT = "https://ipfs.io/ipfs/QmXJyiiJSvVgfzMTXHFkyGoeS31ipjkqJzx5dR5vowCKD1";

    const proxyAddress = "0xE482ACc8Dc5e177C5dFc94b4b1be29881fd3bf03";
    // Deploying the ERC721 contract
    // const nftContractArtifact = await deployer.loadArtifact("soulBT");
    // const nftContract = await deployer.deploy(nftContractArtifact, []);

    const soulBTV2Artifact = await deployer.loadArtifact('soulBTV2');
    const soulBTV2Contract = await hre.zkUpgrades.upgradeProxy(deployer.zkWallet, proxyAddress, soulBTV2Artifact);

    // const nftContract = await deployer.deploy(soulBTV2, []);

    console.log(`NFT Contract address: ${soulBTV2Contract.address}`);

    const recipientAddress = wallet.address;

    // Mint NFTs to the recipient address
    const tx = await soulBTV2Contract.mintTo(recipientAddress, baseNFT);
    await tx.wait();
    console.log(`The NFT has been given to ${recipientAddress}`);

    // Get and log the balance of the recipient
    const balance = await soulBTV2Contract.balanceOf(recipientAddress);
    console.log(`Balance of the recipient: ${balance}`);
    console.log(`Done!`);

}

