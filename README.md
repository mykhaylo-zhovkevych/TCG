# TCG

## General Description
What is the TCG? It is a deck game, that manages shared turns via phases, utilize resources to play cards, and satisfy win conditions to defeat an opponent player.

#### Technical Cases
Game Rules
Winner is a player that has killed virtual opponent or hasn't run out of the cards 

1. Game must have 30 cards, 20 playable and 10 energy
2. Only 3 cards with the same name allowed, exception energy cards
3. There is 3 types of the cards (basic, stage1, stage2) and energy, no trainer 
4. Game randomly chooses the first player
5. Energy cards used to fill up the mana level
5.1 One energy card can be used up in one phase

Gameplay
1. Player has deck where his 5 cards exist and active player aria
2. If player doesn't have basic card then return the cards back and shuffle, until one basic card appears. (opponent may draw one card after each shuffle)
3. If card with stage1 evolves from specific basic card then card will be evolved into the stage2, basic card cannot evolve into stage2
3.1 Evolved card will have 50% boost or at least higher spec than basic card
4. Player can attack virtual opponent with predefined card damage amount
4.1 Player can attack opponent card with predefined card damage amount
5. Energy card will increase the current level of the mana
6. Player can shuffle his cards this will use up 3 mana in one round

Game State
1. Game has virtual Player, that has mana and health level
2. Player can perform attack, level up the mana or perform the shuffle


#### Use Cases
##### 1. Start Game
Subject area: game Setup / Match Initialization
Business event: A player wants to start a new TCG match
Use case overview: The Player starts a new game. The system validates the player deck, prepares the game state, shuffles the deck, draws the starting hand, checks whether the player has at least one basic card, and randomly chooses the first player. After this, the game enters the frist phase.
Termination outcome: Successful outcome: The game starts successfully and the first turn begins. Unsuccessful outcome 1: The deck is invalid.  Unsuccessful outcome 2: The player has no basic card in the starting hand and must reshuffle. Unsuccessful outcome 3: The game cannot start because of a system error.
Traceability to: 
Game rules: Deck must have 30 cards, 20 playable and 10 energy cards 
Game rules: Maximum 4 cards with the same name, except energy cards
Gameplay rules: Player starts with 5 cards
Gameplay rules: Player must have at least one basic card
Game state: Virtual player has mana and health level

##### 2. End Game
Subject area: Game Resolution / Win Condition
Business event: A player or the game system reaches a condition where the match must end.
Use case overview: The game ends when a win or loss condition is reached. A player wins if the virtual opponent is defeated or if the opponent can no longer continue. A player loses if they run out of cards or their own game state no longer allows them to continue. The system checks the current health, deck state, and active game conditions, then displays the result.

#### Home background 
PWAs is a website that looks and behaves like native mobile or desktop app.
Key Components are:
Service Worker, JavaScript files that run in the background, enabling offline functionality, push notifications, and content caching.
Web Home Manifest: 
JSON files that controls how the app appears, when installed on the device and defines its behavior.
Responsive Design: Adapts to different sizes.
Push Notifications: Allows apps to receive messages from the server even when the app is not active in the browser.

#### Tests & Tools
Redux is used for managing complex interplays of the states.
Such as a one central place from where most state changes can be used directly.  

Vitest

#### installation

`npm install` & `npm run dev`