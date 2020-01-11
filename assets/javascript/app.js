// Create base variables.




// Create questions in an array.  
var quizQuestions = [
    // For each question create an object.
        // Question: "string"
        // Answers: [Array]
        // Correct Answer: Array Index
    {
        question: "What is the U.S.S. Enterprise's registry number?",
        options: ["NCC-1701", "NCC-1071", "NX-01", "NCC-1700"],
        correctAnswer: "NCC-1701"
    },
    {
        question: "In the episode Trouble with Tribbles, why did Scotty start a fight with the Klingons?",
        options: ["They called humans Regulan Blood Worms!", "They called Captain Kirk a Denebian Slime Devil!", "They said the Enterprise should be hauled away as garbage!", "Trick Question. The Klingons started the fight!"],
        correctAnswer: "They said the Enterprise should be hauled away as garbage!"
    },
    
    {
        question: "What is Chief Engineer Mr. Scott(aka 'Scotty')'s First Name?",
        options: ["Edward", "Marcus", "Geordi", "Montgomery"],
        correctAnswer: "Montgomery"
    },
    {
        question: "What was Spock's blood type?",
        options: ["X positive", "T negative", "AZ positive", "O negative"],
        correctAnswer: "T negative"
    },
    {
        question: "In the episode 'Arena', Kirk is forced into combat with the Gorn.  He makes gunpowder using 3 elements he finds on the planet.  Which of these is NOT one of those elements?",
        options: ["Dilithium", "Coal", "Potassium Nitrate", "Sulfur"],
        correctAnswer: "Dilithium"
    },
    {
        question: "What is Uhura's Job on the Enterprise?",
        options: ["Chief Engineer", "Communications Officer", "Captain's Yeoman", "Security Officer"],
        correctAnswer: "Communications Officer"
    },
    {
        question: "The actress that played Nurse Chapel(Majel Barrett) was married to William Shatner in real life.",
        options: ["True", "False"],
        correctAnswer: "False",
        
    },

    
];


var correctAnswers = 0;

var incorrectAnswers = 0;

var count = 21;

var counter;

var userGuess;

var current = 0;


var backgroundSound = new Audio("assets/music/bridge-background.mp3");
var rightSound = new Audio("assets/music/computer-sound-1.mp3");
var wrongSound = new Audio("assets/music/computer-sound-3.mp3");
var timeSound = new Audio("assets/music/time-left.wav");
var timoutSound = new Audio("assets/music/dah-duh-duh.wav");
var endSound = new Audio("assets/music/ClosingCredits.mp3");
// On click function that begins the quiz.
$("#start-button").on("click", function(){
   //clicking the button hides instructions.
    $("#main-info").hide();
    //Plays sound when button is clicked.
    backgroundSound.play();
    //clicking the button also starts a timer and starts the game.
    counter = setInterval(timer, 1000);
    //runs the game function.
    triviaGame();
    

});
//Timer function
function timer() {
    count--;
    $("#timer").html("Time Left: " + count);
    if (count ===5) {
        timeSound.play();
    }
    if (count ===0) {
        timoutSound.play();
        incorrectAnswers++;
        $("#question-div").hide();
        $("#options-div").hide();
        $("#timer").hide();
        var correctA = quizQuestions[current].correctAnswer;
        var timeoutMsg = $("<div>");
        timeoutMsg.addClass("timeout-msg");
        $("#information").html(timeoutMsg);
        $(".timeout-msg").text("Uh-oh! You ran out of time.. The correct answer is: " + correctA);
        clearTimer();
        setTimeout(newQuestion, 3000);
        
        };
    //Have it show the time in the HTML    
    
};

function clearTimer() {
    clearInterval(counter);
};

// Create the Game Function.
function triviaGame() {
    //shows the current question.
    $("#question-div").text(quizQuestions[current].question);
    
    //create a variable for the answer options.
    
    var optionsArr = quizQuestions[current].options;
    
    //Loop through the option array.
    for (i =0; i < optionsArr.length; i++) {
        var button = $("<button>");
        //create a button for every option in the array.
        button.text(optionsArr[i]);
        //give buttons data- attribute
        button.attr("data-guess", optionsArr[i]);
        //add class to buttons
        $(button).addClass("button-guess");
        //display the options as buttons in the html.
        $("#options-div").append(button);
        $("#options-div").show();
        console.log(optionsArr[i]);
    };
    
    //create an on click event for the answer buttons.
    // .off fixes the problem per question increase.
    $("#options-div").off("click").on("click", ".button-guess", function() {
        
        var userGuess = $(this).data("guess");
        var correctA = quizQuestions[current].correctAnswer;
        console.log(correctA);
        console.log(userGuess);
        if( userGuess === correctA) {
            rightSound.play();
            correctAnswers++;
            $("#question-div").hide();
            $("#options-div").hide();
            $("#timer").hide();
            var correctMsg = $("<div>");
            correctMsg.addClass("correct-msg");
            $("#information").html(correctMsg);
            $(".correct-msg").text("Congratulations! The correct answer is: " + correctA);
            clearTimer();
            setTimeout(newQuestion, 3000);
            
            
        }
        else if(userGuess != correctA) {
            wrongSound.play();
            incorrectAnswers++;
            $("#question-div").hide();
            $("#options-div").hide();
            $("#timer").hide();
            var wrongMsg = $("<div>");
            wrongMsg.addClass("wrong-msg");
            $("#information").html(wrongMsg);
            $(".wrong-msg").text("Wrong! The correct answer is: " + correctA);
            clearTimer();
            setTimeout(newQuestion, 3000);
            
            
        };
    });

    
};


function newQuestion () {
    current++;
    
    if (current === quizQuestions.length) {
        backgroundSound.pause();
        endSound.play();
        clearDiv();
        clearTimer();
        $("#scoreboard").text("Correct Answers: " + correctAnswers);
        $("#scoreboard").append("<br>" + "Incorrect Answers: " + incorrectAnswers);
        $("#scoreboard").append("<br>" + "Thanks for playing! If you got less than 5 right, you definitely need to watch more Star Trek.  If you got more more than 5 right, you are a true Trekker!  Celebrate by grabbing a Romulan Ale and watching some Star Trek!");
        $("#scoreboard").append("<br>" + "<br>" + "Top 10 Star Trek Episodes: " + "<a href='https://www.youtube.com/watch?v=Fmn4FXXnIc4&list=PLN-VkgdpDxSK467YsydEHx1XZcuoQhTJX' target='_blank'>YOUTUBE</a>")
    }
    else {
        count=21;
        clearDiv();
        $("#timer").show();
        $("#question-div").show();
        $("#options-div").show();    
        counter=setInterval(timer, 1000);
        triviaGame();
    }
    


    
    
};

function clearDiv () {
    $(".correct-msg").hide();
    $(".wrong-msg").hide();
    $(".timeout-msg").hide();
    $("#options-div").each(function() {
        $(this).text("");
        });
    
};




        





// Create the Game Function.
    //On click events for the answer buttons.
    //if correct answer is clicked +1 to the correct answer variable.
    //if incorrect answer is clicked +1 to incorrect answer variable.
    //if time expires +1 to incorrect answer variable.

    //when a button is clicked or time expires:
        //show correct answer and if the player got it right. (show for about 3-5 seconds).
        //move on the the next question and reset the timer.


//write the updated score to the HTML.
//After running through the entire array.  The game is finished.


