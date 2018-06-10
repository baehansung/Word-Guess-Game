$(document).ready(function (){

    const maxTries = 7;
    var guessedLetters = [];
    var currentWordIndex;
    var wordATM = [];
    var guessesRemaining = 0;
    var gameStarted = false;
    var hasFinished = false;
    var wins = 0;

    var randomWordArr = ['Lionel Messi', 'Cristiano Ronaldo', 'Michael Jordan', 'Lebron James', 'Kobe Bryant', 'Roger Federer', 'Rafael Nadal', 'Carson Wentz', 'Nick Foles', 'Muhammad Ali'];
    var randomWord = randomWordArr[Math.floor(Math.random() * randomWordArr.length)];

    // $( "#intro" ).keypress(function() {
    //     console.log( "Handler for .keypress() called." );
    // });

    //the document.onkeypress function below listens for user to click key to start game
    // document.onkeypress = function (e) {
    //     e = e || window.event;
    //     console.log('it works');
    //     $("#theWord").prepend(randomWord);
    // };

    function reset() {
        guessesRemaing = maxTries;
        gameStarted = false;

        currentWordIndex = Math.floor(Math.random() * (randomWordArr.length));

        guessedLetters = [];
        wordATM = [];

        document.getElementById("hangmanImg").src = "";

        for(var i = 0; i < randomWordArr[currentWordIndex].length; i++){
            wordATM.push("_");
        }

        display();
    };

    // document.onkeypress = function(e){
    //     e = e || window.event;
    //     for(var i=0; i<=randomWord.length; i++){
    //         $("#theWord").prepend("  _  ");
    //     }
    // };

    function display(){

        $("#count").text(wins);
        $("#theWord").text("");

        for(var i = 0; i < wordATM.length; i++){
            document.getElementById("theWord").innerText += wordATM[i];
        }

        $("#guessNum").text(guessesRemaining);
        $("#guessLetters").text(guessedLetters);

        if(guessesRemaining <= 0){
            
            hasFinished = true;
        }
    };

    function userGuess(letter){
        if(guessesRemaining > 0){
            if(!gameStarted){
                gameStarted = true;
            }
            if(guessedLetters.indexOf(letter) === -1){
                guessedLetters.push(letter);
                compareLetter(letter);
            }
        }
        display();
        checkWin();
    };

    document.onkeypress = function(e){
        if(hasFinished){
            reset();
            hasFinished = false;
        } else {
            if(event.keyCode >= 65 && event.keyCode <= 90){
                usersGuess(e.key.toLowerCase());
            }
        }
    };

    function compareLetter(letter){
        var positions = [];

        for(var i = 0; i < randomWordArr[currentWordIndex].length; i++){
            if(randomWordArr[currentWordIndex][i] === letter){
                positions.push(i);
            }
        }

        if(positions.length <= 0){
            guessesRemaining--;

        } else{
            for(var i = 0; i < positions.length; i++){
                wordATM[positions[i]] = letter;
            }
        }
    };

    function checkWin(){
        if(wordATM.indexOf("_") === -1){
           $("#guessNum").text("YOU WIN");
           wins++;
           hasFinished = true;
        }
    };

});


// for(var i=0; i<=randomWord.length; i++){
//     $("#theWord").prepend("_");
// }