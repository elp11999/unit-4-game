//
// JavaScript for Unit-4-test
//
$(document).ready(function() {
    console.log("Cyrstal game started...");

    var crystalGame = {
        totalScore: 0,
        totalWins: 0,
        totalLoses: 0,
        randomNumber: 0,        
        crystalValues: [],
        audioElement: "",
        winnerSound: "assets/audio/winner.wav",
        loserSound: "assets/audio/loser.wav",
        startGame: function() {
            var crystalValue = 0;

            // Reset game total 
            this.crystalValues = [];
            this.totalScore = 0;
            $(".totalscore").text(this.totalScore);

            // Create random number between 19 - 120
            this.randomNumber = Math.floor(Math.random() * (120 - 19 + 1) + 19);
            $(".randomnumber").text(this.randomNumber);
            //console.log("startGame: randomNumber=" + this.randomNumber);

            // Create random numbers for crystals between 1 - 12;
            for (var i = 1; i <= 4; i++) {
                this.crystalValues[i] = this.createcrystalValue();
                //console.log("startGame: crystalValue=" + this.crystalValues[i]);
                $(".crystal" + i).data("crystalvalue", this.crystalValues[i]);
            }
        },
        createcrystalValue: function() {
            var index = 0;
            var crystalValue = 0;

            // Create a unique random crystal value
            while (true) {
                crystalValue = Math.floor(Math.random() * (12 - 1 + 1) + 1);
                index = this.crystalValues.indexOf(crystalValue);
                if (index < 0)
                    break;
            }

            // Return crystal value
            return crystalValue;        
        },
        playGame: function(value) {

            // Increment total score based on crystal value
            this.totalScore += value;
            $(".totalscore").text(this.totalScore);
            //console.log("playGame: totalScore=" + this.totalScore);

            // Hide win lose message
            $(".result").hide();   

            // Check win or lose
            if (this.totalScore === this.randomNumber) {

                // You won
                this.totalWins++;
                $(".wins").text(this.totalWins);

                $(".result").text("You Win!!");
                $(".result").show();

                this.audioElement.setAttribute("src", this.winnerSound);
                this.audioElement.play();

                // Restart game
                crystalGame.startGame();
            } else if (this.totalScore > this.randomNumber) {

                // You lost
                this.totalLoses++;
                $(".loses").text(this.totalLoses);

                $(".result").text("You Lose!!");
                $(".result").show();

                this.audioElement.setAttribute("src", this.loserSound);
                this.audioElement.play();

                // Restart game
                crystalGame.startGame();
            }       
        }
    };
    
    // Create audio element
    crystalGame.audioElement = document.createElement("audio");

    // Register click event handler for the crystal images
    $(".crystal").click(function(event) {
        var crystalValue;

        crystalValue = $(this).data("crystalvalue");
        crystalGame.playGame(parseInt(crystalValue));
        //console.log("crystal value=" + crystalValue);
    });

    // Start game
    crystalGame.startGame();
});
