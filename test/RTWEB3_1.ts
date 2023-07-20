import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe("RTWEB3_1", () => {
  it("can be minted", async () => {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("RTWEB3_1");
    await token.safeMint(owner, "");
    await token.safeMint(owner, "");
    await expect(token.safeMint(owner, "")).to.be.rejected;
  });

  it("stops minting once supply cap is reached", async () => {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("RTWEB3_1");
    await token.safeMint(owner, "");
    await token.safeMint(owner, "");
    await expect(token.safeMint(owner, "")).to.be.rejected;
  });

  it("new user can always mint", async () => {
    const [add1, add2] = await ethers.getSigners();

    const token = await ethers.deployContract("RTWEB3_1");
    await token.safeMint(add1, "");
    await token.safeMint(add1, "");
    await expect(token.safeMint(add1, "")).to.be.rejected;
    await token.safeMint(add2, "");
  });
});
