import { ethers } from "hardhat";
import { CryptoPass__factory } from "../typechain/factories/CryptoPass__factory";
import web3 from "web3";

(async () => {
  // initialize web3 provider from private key
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
  const signer = new ethers.Wallet(process.env.PK!, provider);

  //   console.log("Block Number", await provider.getBlockNumber());
  //   console.log("Account balance", await signer.getBalance());

  /// call contract function
  const factory = CryptoPass__factory.connect(
    process.env.CONTRACT_ADDRESS!,
    signer
  );

  const secrets = await factory.getSecretInRange(0, 10);
  console.log(secrets);
})();
