// Global variables
var playerScores, currentScore, activePlayer, gamePlay, threshold;

// Initializing the game
init();

// Adding event listeners
document.querySelector('.btn-roll').addEventListener('click',rollFunction);
document.querySelector('.btn-hold').addEventListener('click',holdFunction);
document.querySelector('.btn-new').addEventListener('click',init);

// Functions
function init()
{

    /* This function will initialize a new game */

    // Defining the variables
    playerScores = [0,0];
    activePlayer = 1;
    currentScore = 0;
    gamePlay = true;
    threshold = 100;

    // Updating the interface
    document.getElementById('score-1').textContent = 0;
    document.getElementById('score-2').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('current-2').textContent = 0;
    document.getElementById('name-1').textContent = 'Player 1';
    document.getElementById('name-2').textContent = 'Player 2';

    // Removing the winner and active classes
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-2-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-2-panel').classList.remove('winner');

    // Making player 1 active
    document.querySelector('.player-1-panel').classList.add('active');

    // Hiding the dice
    document.getElementById('dice').style.visibility = 'hidden';
}

function rollFunction()
{

    /* This function will be called when the player will click the roll dice button */

    // Check if the game is running
    if (gamePlay)
    {
        var diceDOM = document.getElementById('dice');
        // Generating a random value for dice
        var dice = Math.ceil(Math.random() * 6);
        // Displaying the correct dice
        diceDOM.style.visibility = 'visible';
        diceDOM.src = "dice-" + dice + ".png";
        // Adding the value in current score if it is not one else changing player
        if (dice != 1)
        {
            // Calculate the current score
            currentScore += dice;
            // Update the UI
            document.getElementById('current-' + activePlayer).textContent = currentScore;
        }
        else
        {
            // Change the active player
            changePlayer();
        }
    }
}

function holdFunction()
{

    /* This function will be called when the user will click hold button */

    // Check if game is running
    if (gamePlay)
    {
        // Add the current score to total score of active player
        playerScores[activePlayer - 1] += currentScore;
        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = playerScores[activePlayer - 1];
        // Check if the active player has reached the threshold or not (won or not)
        if (playerScores[activePlayer - 1] >= threshold)
        {
            // Add the winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // Negate the gameplay variable
            gamePlay = false;
            // Display winner in place of player name
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!'
            // Hide the dice
            document.getElementById('dice').style.visibility = 'hidden';
        }
        else
        {
            // Change the active player
            changePlayer();
        }
    }
}

function changePlayer()
{
    /* This function will change the active player and zero the current scores */

    // Toggle the active player
    activePlayer = (activePlayer == 1 ? 2 : 1);
    // Update the UI for active player
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-2-panel').classList.toggle('active');
    // Zero the scores
    currentScore = 0;
    // Update the UI for current scores
    document.getElementById('current-1').textContent = 0;
    document.getElementById('current-2').textContent = 0;
}