import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

const [VILL1, VILL2] = [1, 2];

describe.only("RTWEB3_2", () => {
  describe("settle", () => {
    it("mints new village", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const token = await ethers.deployContract("RTWEB3_2");
      await token.connect(PLAYER).settle(VILL1, {
        value: ethers.parseEther("100"),
      });
      expect(await token.balanceOf(PLAYER, VILL1)).to.eq(
        ethers.parseEther("100")
      );
    });

    it("adds pop to existing village", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const token = await ethers.deployContract("RTWEB3_2");
      expect(await token.exists(VILL1)).to.be.false;
      await token.connect(PLAYER).settle(VILL1, {
        value: ethers.parseEther("100"),
      });
      expect(await token.exists(VILL1)).to.be.true;
      await token.connect(PLAYER).settle(VILL1, {
        value: ethers.parseEther("100"),
      });
      expect(await token.exists(VILL1)).to.be.true;
      expect(await token.balanceOf(PLAYER, VILL1)).to.eq(
        ethers.parseEther("200")
      );
    });
  });

  describe("move", () => {
    it("mints new village", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const token = await ethers.deployContract("RTWEB3_2");
      expect(await token.exists(VILL2)).to.be.false;
      await token.connect(PLAYER).settle(VILL1, {
        value: ethers.parseEther("100"),
      });
      await token.connect(PLAYER).move(VILL1, VILL2, ethers.parseEther("50"));
      expect(await token.exists(VILL2)).to.be.true;
      expect(await token.balanceOf(PLAYER, VILL1)).to.eq(
        ethers.parseEther("50")
      );
      expect(await token.balanceOf(PLAYER, VILL2)).to.eq(
        ethers.parseEther("50")
      );
    });

    it("moves pop to existing village", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const token = await ethers.deployContract("RTWEB3_2");
      await token.connect(PLAYER).settle(VILL1, {
        value: ethers.parseEther("100"),
      });
      await token.connect(PLAYER).settle(VILL2, {
        value: ethers.parseEther("100"),
      });
      await token.connect(PLAYER).move(VILL1, VILL2, ethers.parseEther("50"));
      expect(await token.balanceOf(PLAYER, VILL1)).to.eq(
        ethers.parseEther("50")
      );
      expect(await token.balanceOf(PLAYER, VILL2)).to.eq(
        ethers.parseEther("150")
      );
    });
  });

  describe("loot", () => {
    it("burns village and returns funds", async () => {
      const [, PLAYER] = await ethers.getSigners();
      const token = await ethers.deployContract("RTWEB3_2");
      await token.connect(PLAYER).settle(VILL1, {
        value: ethers.parseEther("100"),
      });
      expect(await token.balanceOf(PLAYER, VILL1)).to.eq(
        ethers.parseEther("100")
      );
      await expect(
        await token.connect(PLAYER).loot(VILL1)
      ).to.changeEtherBalance(PLAYER, ethers.parseEther("100"));
      expect(await token.balanceOf(PLAYER, VILL1)).to.eq(0);
    });
  });
});
