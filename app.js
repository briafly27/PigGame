/*
Remaining steps in this project:
- Create a Rules link that players can use to view the instructions listed below.
- Incude credit for project idea from Jonas Schmedtmann's The Complete Javascript 2019 course on Udemy.com

GAME RULES:
- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as they wish to. Each result gets added to their ROUND score.
- If the player rolls a 1, all of their ROUND score is lost. After that, it's the next player's turn.
- If the player rolls two 6's in a row, they lose all of their ROUND score and GLOBAL score. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn.
- The first player to reach the Winning Score in their GLOBAL score wins the game. If no winning score was submitted by a player, the default Winning Score is 100.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // 3. Reset score if player rolls 6 twice simultaneously
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        // 4. Update the round score IF the rolled number is NOT a 1
        } else if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }

        lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
    // 1. Add Current Score to Global Score
        scores[activePlayer] += roundScore;
        // 2. Update user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // 3. Know the winning score
        var input = document.querySelector('.winning-score').value;
        var winningScore;
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // 4. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }      
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}