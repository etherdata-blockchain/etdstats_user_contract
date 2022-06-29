import { expect } from "chai";
import { ethers } from "hardhat";

describe("User Contract", function () {
  const mockUser = {
    username: "test",
  };

  it("Should update secret without problem", async function () {
    const signer = await ethers.getSigners();
    const User = await ethers.getContractFactory("User");
    const UserContract = await User.deploy();

    expect(await UserContract.getUserCount()).to.equal(0);
    expect(await UserContract.getUser(signer[0].address)).to.equal("");
    expect(await UserContract.getUserAddressesInRange(0, 10)).to.deep.equal([]);

    await UserContract.updateUser(JSON.stringify(mockUser));
    expect(await UserContract.getUserCount()).to.equal(1);
    expect(await UserContract.getUser(signer[0].address)).to.equal(
      JSON.stringify(mockUser)
    );
    expect(await UserContract.getUserAddressesInRange(0, 10)).to.deep.equal([
      signer[0].address,
    ]);
  });

  it("Should return correct info when multiple users", async function () {
    const [account1, account2, account3, accounts] = await ethers.getSigners();
    const User = await ethers.getContractFactory("User");
    const UserContract = await User.deploy();

    await UserContract.updateUser(JSON.stringify(mockUser));
    await UserContract.connect(account2).updateUser(JSON.stringify(mockUser));
    await UserContract.connect(account3).updateUser(JSON.stringify(mockUser));

    expect(await UserContract.getUserCount()).to.equal(3);
    expect(await UserContract.getUserAddressesInRange(0, 10)).to.deep.equal([
      account1.address,
      account2.address,
      account3.address,
    ]);

    expect(await UserContract.getUser(account1.address)).to.equal(
      JSON.stringify(mockUser)
    );

    expect(await UserContract.getUser(account2.address)).to.equal(
      JSON.stringify(mockUser)
    );

    expect(await UserContract.getUser(account3.address)).to.equal(
      JSON.stringify(mockUser)
    );
  });
});
