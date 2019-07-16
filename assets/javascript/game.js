$(document).ready(function () {
   //questions to be asked in array form
    var questions = [
        {
            question: "What popular soda was invented first",
            choice: ["Dr.Pepper", "Coca-Cola", "Pepsi", "R.C. Cola"],
            answer: 0,
            photo: "assets/images/drpepper.jpg"
        }
        ,
        {
            question: "According to the RIAA the number one selling  music album of all time is?",
            choice: ["Michael Jackson's Thriller", "the Eagles Greatest Hits", "Kidz Bop 11", "the Titanic Soundtrack"],
            answer: 1,
            photo: "assets/images/eagles.jpg"
        }
        ,
        {
            question: "In 2005 Kanye West received Grammy nominations in all of the following categories except?",
            choice: ["Album of the Year", "Best Solo Rap Performance", "Best Longform Music Videos", "Record of the Year"],
            answer: 2,
            photo: "assets/images/kanye.jpg"
        }
        ,

        {
            question: "the Pyrenees separates which two European Countries?",
            choice: ["France and Germany", "Spain and Portugal", "France and Spain", "Germany and Poland"],
            answer: 2,
            photo: "assets/images/pyrenees.jpg"
        }
        ,
        {
            question: "What is the highest uninterrupted waterfall in the world?",
            choice: ["Yosemite Falls", "Tugela Falls", "Niagra Falls", "Angel Falls"],
            answer: 3,
            photo: "assets/images/falls.jpg"
        }
        ,
        {
            question: "Who directed the movie 8 1/2?",
            choice: ["Stanley Kubrick", "Federico Fellini", "Yasujiro Ozu", "Paul Thomas Anderson"],
            answer: 1,
            photo: "assets/images/fellini.jpg"
        }
        ,
        {
            question: "Which of the following artists has won the most Grammys?",
            choice: ["Kanye West", "Paul McCartney", "Ray Charles", "Taylor Swift"],
            answer: 0,
            photo: "assets/images/west.jpg"
        }
        ,
        {
            question: "Which NBA team won the most titles in the 90s?",
            choice: ["Houston Rockets", "Chicago Bulls", "Seattle Supersonics", "Miami Heat"],
            answer: 1,
            photo: "assets/images/mj.jpg"
        }
       ];



    var timer = 20;
    var intervalId;
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var userGuess = "";
    var running = false;
    var qCount = questions.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];



    $("#reset").hide();
    //starts trivia
    $("#start").on("click", function () {
        $("#start").hide();
        askQuestion();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })

    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time left: " + timer + "</h3>");
        timer--;


        if (timer === 0) {
            unanswered++;
            stop();
            $("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            picture();
        }
    }

    function stop() {
        running = false;
        clearInterval(intervalId);
    }


    function askQuestion() {
        index = Math.floor(Math.random() * questions.length);
        pick = questions[index];

        $("#question").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answer").append(userChoice);

        }




        $(".answerchoice").on("click", function () {
            userGuess = parseInt($(this).attr("data-guessvalue"));

            if (userGuess === pick.answer) {
                stop();
                correct++;
                userGuess = "";
                $("#answer").html("<p>Correct!</p>");
                picture();

            } else {
                stop();
                wrong++;
                userGuess = "";
                $("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                picture();
            }
        })
    }
    function picture() {
        $("#answer").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        questions.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answer").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrong + correct + unanswered) === qCount) {
                $("#question").empty();
                $("#question").html("<h3>Game Over! </h3>");
                $("#answer").append("<h4> Correct: " + correct + "</h4>");
                $("#answer").append("<h4> Incorrect: " + wrong + "</h4>");
                $("#answer").append("<h4> Unanswered: " + unanswered + "</h4>");
                $("#reset").show();
                correct = 0;
                wrong = 0;
                unanswered = 0;

            } else {
                runTimer();
                askQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answer").empty();
        $("#question").empty();
        for (var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        runTimer();
        askQuestion();

    })

})
