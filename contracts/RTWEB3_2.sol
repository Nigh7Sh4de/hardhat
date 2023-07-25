// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "hardhat/console.sol";

contract RTWEB3_2 is ERC1155, ERC1155Burnable, Ownable, ERC1155Supply {
    constructor() ERC1155("") {}

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /* --- My functions --- */

    function settle(uint256 id) public payable {
        _mint(msg.sender, id, msg.value, "");
    }

    function move(uint256 from, uint256 to, uint256 amount) public {
        burn(msg.sender, from, amount);
        _mint(msg.sender, to, amount, "");
    }

    function loot(uint256 id) public {
        uint256 balance = balanceOf(msg.sender, id);
        payable(msg.sender).transfer(balance);
        burn(msg.sender, id, balance);
    }
}
