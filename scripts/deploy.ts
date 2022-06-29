import { ethers, run } from "hardhat";

async function main() {
  await run("compile");

  // We get the contract to deploy
  const contract = await ethers.getContractFactory("User");
  console.log("Deploying contract...");
  const deployedContract = await contract.deploy();
  await deployedContract.deployed();
  console.log("Contract deployed to:", deployedContract.address);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
