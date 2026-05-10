# TCG

## General Description
What is the TCG? It is a deck game, that manages shared turns via phases, utilize resources to play cards, and satisfy win conditions to defeat an opponent player.

#### Technical Cases
Game Rules
Winner is a player that has killed virtual opponent or hasn't run out of the cards 

1. Game must have 30 cards, 20 playable and 10 energy
2. Only 4 cards with the same name allowed, exception energy cards
3. There is 3 types of the cards (basic, stage1, stage2) and energy, no trainer 
4. Game randomly chooses the first player
5. Energy cards used to fill up the mana level
5.1 One energy card can be used up in one phase

Gameplay
1. Player has deck where his 5 cards exist and active player aria
2. If player doesn't have basic card then return the cards back and shuffle, until one basic card appears. (opponent may draw one card after each shuffle)
3. If card with stage1 evolves from specific basic card then card will be evolved into the stage2, basic card cannot evolve into stage2
3.1 Evolved card will have 50% boost of the spec and 30% of mana
4. Player can attack virtual opponent with predefined card damage amount
4.1 Player can attack opponent card with predefined card damage amount

5. Energy card will increase the current level of the mana 

Game State
1. Game has virtual Player, that has mana and health level
2. Player can perform attack, level up the mana or perform the shuffle

### Plan
| Date        | Estimated Task        | Expected Result                                | Actual Result |
|-------------|-----------------------|------------------------------------------------|---------------|
| 10.05–11.05 | Information Gathering | Identifying most important rules and use cases | done          |
| 11.05–12.05 |                       |                                                |               |
| 12.05–13.05 |                       |                                                |               |
| 14.05–15.05 | Working Prototype     |                                                |               |                                  


#### Use Cases


#### Tests & Expectations

