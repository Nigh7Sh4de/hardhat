# Week 2

- Learned how to create `payable` functions that allow funds to be received by the contract
- Learned how to withdraw funds using `transfer` on the receipient

I want to build on what I learned this week, and make something that is in line with my longer-term goal of creating a web3 game. On top of the prescribed challenge (multiple deposit amounts, multiple withdrawal locations), I will also create a set of functions that will allow players to:

1. Settle new cities
2. Move population between cities

To keep things simple for now, settling new cities can be accomplished by sending funds to a `settle` payable function that will mint a number of villagers equal to the amount of deposited funds. Players can `loot` their cities, reducing their population there to 0, to withdraw the funds from that village.
