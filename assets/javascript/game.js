//
// JavaScript for Stars Wars
//
$(document).ready(function() {

    console.log("Star Wars game started...");

    var player1 = {
        name: "Obi-Wan Kenobi",
        healthPoints: 0,
        baseAttackPower: 0,
        attackPower: 0,
        couterAttackPower: 0
    };
    
    var player2 = {
        name: "Darth Sideous",
        healthPoints: 0,
        baseAttackPower: 0,
        attackPower: 0,
        couterAttackPower: 0
    };
    
    var player3 = {
        name: "Luke Skywalker",
        healthPoints: 0,
        baseAttackPower: 0,
        attackPower: 0,
        couterAttackPower: 0
    };
    
    var player4 = {
        name: "Darth Maul",
        healthPoints: 0,
        baseAttackPower: 0,
        attackPower: 0,
        couterAttackPower: 0
    };
    
    var StarWarsGame = {
        gameInProgress: false,
        attackInProgress: false,
        enemiesLeft: 0,
        players : ["", player1, player2, player3, player4],
        activePlayerID: 0,
        activeDefenderID: 0,
        activeBackgroundID: 0,
        activeTimerID: null,
        backgroundImages: ["assets/images/starwars1.jpg", "assets/images/starwars2.jpg", "assets/images/starwars3.jpg", "assets/images/starwars4.jpg", "assets/images/starwars5.jpg"],
        audioElement: "",
        winnerSound: "assets/audio/winner.wav",
        loserSound: "assets/audio/loser.wav",
        // Show only player selected
        showPlayerOnly : function(id) {
            for (var index = 1; index < this.players.length; index++) {
                if (index === id)
                    $("#player" + index).show();
                else
                    $("#player" + index).hide();
            }
        },

        // Show all players but the player picked
        showEnemiesBut : function(id) {
            for (var index = 1; index < this.players.length; index++) {
                if (index === id)
                    $("#enemy" + index).hide();
                else {
                    $(".enemy" + index + "health").text(this.players[index].healthPoints);
                    $("#enemy" + index).show();
                }
            }
        },

        // Show all players
        showAllPlayers : function() {
            for (var index = 1; index < this.players.length; index++) {
                $("#player" + index).show();
                $(".player" + index + "health").text(this.players[index].healthPoints);
            }
        },

        // Hide all enemies
        hideAllEnemies : function() {
            $(".enemies").hide();
            for (var index = 1; index < this.players.length; index++) {
                $("#enemy" + index).hide();
            }
        },

        // Hide all defenders
        hideAllDefenders : function() {
            $(".defenders").hide();
            for (var index = 1; index < this.players.length; index++) {
                $("#defender" + index).hide();
            }
        },

        // Initialize Game
        initalizeGame: function() {

            // Setup flags
            this.gameInProgress = false;
            this.attackInProgress = false;            

            // Start background image rotation timer
            if (this.activeTimerID === null)
                this.activeTimerID = setInterval(this.changeBackgroundImage, 5000);

            // Initalize all  players
            this.initalizePlayers();

            // Show all players
            this.showAllPlayers();
        
            // Hide all enemies
            this.hideAllEnemies();
        
            // Hide all defenders
            this.hideAllDefenders();

            // Clear out results area
            $(".gameResult1").text("");
            $(".gameResult2").text("");

        },

        // Initialize Players
        initalizePlayers: function() {

            // Set values for Health points, etc... for each player
            for (var i = 0; i < this.players.length; i++) {
                var player = this.players[i];
                player.healthPoints = Math.floor(Math.random() * (150 - 100 + 1) + 100);
                player.baseAttackPower = Math.floor(Math.random() * (15 - 5 + 1) + 5);
                player.attackPower = 0;
                player.couterAttackPower = Math.floor(Math.random() * (30 - 5 + 1) + 5);
            }
        },

        // Pick the player
        pickPlayer: function(id) {

            // Set active player
            this.activePlayerID = parseInt(id);
            this.showPlayerOnly(this.activePlayerID);            
            console.log("activePlayerID=" + this.activePlayerID);

            // Show the enemies
            $(".enemies").css("display", "inline-block");
            $(".enemies").show();
            this.showEnemiesBut(this.activePlayerID);
            this.enemiesLeft = 3;
            
            // Hide all defenders
            this.hideAllDefenders();
        },

        // Pick the enemy
        pickEnemy: function(id) {
    
            // Hide selected enemy
            $("#enemy" + id).hide();    
            if (StarWarsGame.enemiesLeft === 1)
                $(".enemies").hide();
        
            // Set active defender
            this.activeDefenderID = parseInt(id);
            console.log("activeDefenderID=" + this.activeDefenderID);
            
            // Set defender health points
            $(".defender" + id + "health").text(this.players[this.activeDefenderID].healthPoints);

            // Show defender
            $(".defenders").css("display", "inline-block");
            $(".defenders").show();
            $("#defender" + id).show();
            
            // Clear game result text areas
            $(".gameResult1").text("");
            $(".gameResult2").text("");
    
            // Set game in progress
            this.gameInProgress = true;
            this.attackInProgress = true;

        },

        // Play the game "ATTACK"
        attack: function() {

            // Get the player and defender
            var player = this.players[this.activePlayerID];
            var defender = this.players[this.activeDefenderID];
            //console.log(player);
            //console.log(defender);
            
            // Update players attack power
            player.attackPower += player.baseAttackPower;

            // Update defenders health points
            defender.healthPoints -= player.attackPower;
            $(".defender" + this.activeDefenderID + "health").text(defender.healthPoints);

            // Clear game result text areas
            $(".gameResult1").text("");
            $(".gameResult2").text("");
            
            // Check if the player beat the defender
            if (defender.healthPoints <= 0) {
                this.attackInProgress = false;
                this.enemiesLeft--;
                if (this.enemiesLeft > 0) {
                    $("#defender" + this.activeDefenderID).hide();
                    var result = "You have defeated " + defender.name + ", choose another enemy to fight.";
                    $(".gameResult1").text(result);
                } else {
                    $("#defender" + this.activeDefenderID).hide();
                    $(".gameResult1").text("You Won!!! GAME OVER!!!");
                    $("#replay").show();
                    this.audioElement.setAttribute("src", this.winnerSound);
                    this.audioElement.play();
                }
                return;
            }
            
            // Update players health points
            player.healthPoints -= defender.couterAttackPower;            
            $(".player" + this.activePlayerID + "health").text(player.healthPoints);

            // Check if the player lost the game
            if (player.healthPoints <= 0) {
                    this.attackInProgress = false;
                $(".gameResult1").text("You have been defeated... GAME OVER!!!!");
                $("#replay").show();  
                this.audioElement.setAttribute("src", this.loserSound);
                this.audioElement.play();
            } else {
                var attack = "You attacked " + defender.name + " with " + player.attackPower + " damage points.";
                var counterAttack = defender.name + " attacked you back with " + defender.couterAttackPower + " points.";
                $(".gameResult1").text(attack);
                $(".gameResult2").text(counterAttack);
            }
        },

        // Rotate background image
        changeBackgroundImage: function() {
            $("body").css("background", "url(" + StarWarsGame.backgroundImages[StarWarsGame.activeBackgroundID] + ") no-repeat center center fixed");
            $("body").css("background-size", "cover");
            StarWarsGame.activeBackgroundID++;
            if (StarWarsGame.activeBackgroundID >= StarWarsGame.backgroundImages.length)
                StarWarsGame.activeBackgroundID = 0;
        }

    };

    // Set callback when a player is selected
    $('.playerimage').click(function(event) {

        // Check if game is in-progess
        if (StarWarsGame.gameInProgress === true)
            return;

        // Stop backgound image rotation
        if (StarWarsGame.activeTimerID != null) {
            clearInterval(StarWarsGame.activeTimerID);
            StarWarsGame.activeTimerID = null;
        }

        // Get player id
        var id = $(this).data("playerindex"); 

        // Pick the player
        StarWarsGame.pickPlayer(id);
    });

    // Set callback when an enemy is selected
    $('.enemyimage').click(function(event) {

        // Check if game is in progress
        if (StarWarsGame.attackInProgress === true)
            return;

        // Get player id
        var id = $(this).data("playerindex");

        // Pick the enemy
        StarWarsGame.pickEnemy(id);
    });

    // Set callback when the attack button is clicked
    $("#attack").click(function(event) {
        if (StarWarsGame.attackInProgress === true)
            StarWarsGame.attack();
    });

    // Set callback when the replay button is clicked
    $("#replay").click(function(event) {
        StarWarsGame.initalizeGame();
        $("#replay").hide();
    });

    
    // Create audio element
    StarWarsGame.audioElement = document.createElement("audio");

    // Initalize the game
    StarWarsGame.initalizeGame();
});
