var card = document.getElementById("card");
var timer = document.getElementById("timer");
//gets the elements from html

var button = document.createElement("button");
var header = document.createElement("h2");
var texts = document.createElement("p1");
var uli = document.createElement("ul");
var ans = document.createElement("li");
// the only elements i plan to use

var points = 0;
var time = 40;
var questions = ["Potato","pOtato","poTato","potAto","potaTo"]
var answers = ["Potato","pOtato","poTato","potAto","potaTo"];
var fluff = ["Tomato","tOmato","toMato","tomAto","tomaTo","tomatO","TTomato","tOOmato","toMMato","tomAAto","tomaTTo","tomatOO","TTTomato","tOOOmato","toMMMato"]
var order = [1,2,3,4]
//variables

var ord = []
ord = ord.concat(order)
var res = [];
res = res.concat(fluff);
//reusable variables that reset frequently and original values is in the variables section to save me some typing

old = JSON.parse(localStorage.getItem("scores"))
var highscore = []
highscore = highscore.concat(old);
//the local value for the stored scores and the retrieval of said scorespulled because fiddling with the old variable directly clears the score history

button.style.width = "fit-content";
button.style.alignSelf = "center"
//button stylesettings

ans.addEventListener("click", function() {
    points = points + 1;
    quest();
}); 
//event listener moved here to prevent multiple event listeners added to same item

function startMenu(){
    header.textContent = "Welcome to the Code Game!";
    texts.textContent = "to play the game press the start button just down there";
    button.textContent = "start";
    // elements text

    card.appendChild(header);
    card.appendChild(texts);
    card.appendChild(button);
    // put the stuff on the quiz 

    button.addEventListener("click",quizstart );
    //goes to the next function when start button is pressed
}
// inital page only called once

function quizstart(){
    card.innerHTML = "";
    button.removeEventListener("click",quizstart );
    points = 0;
    //clears old assignments

    texts.textContent = "press the potato if you get it wrong you lose a point if you get it right you get a a point the timer is set to 10 seconds"
    button.textContent = "Start for real this time"
    card.appendChild(texts);
    card.appendChild(button);
    //adds needed elements and texts for the first screen

    button.addEventListener("click",timed);
    //assigns the timer function
}
//instruction text and the actual start button

function timed(){
    button.removeEventListener("click",timed)
    quest();
    setTimeout(results,10000);
    //sets the timer to 40 seconds and runs the results function when time runs out and transitions to the quest functionwhen the timer starts
    var time = 10;
        timer.textContent = time
    var tim = setInterval(function(){
        time -= 1;
        timer.textContent = time
        if(time <= 0){clearInterval(tim)}}
        ,1000)
    // creates the timer, resets timer and sts the textcontent before the set interval due to there being a second delay before 1st call
    
};
// the timer function has been removed form the actual quiz function because of the way i had the quiz func replays every question and theat ended up creating multiple timers


function quest(event){
    card.innerHTML = "";
    uli.innerHTML = "";
    //clears the card when it starts and every new question

    var curr = Math.floor((Math.random() * (questions.length-1)));
    //random number put into variable because i had 2 arrays that needed the same random number

    header.textContent = questions[curr];
    //adds the question to card

    card.appendChild(header);
    card.appendChild(uli);
    //adds the header, answer, and list to card

    var temp = Math.floor(Math.random() * (order.length-1))
    //random number gen
    for (var i=0; i<4; i++){ 

        var rand = (Math.floor(Math.random()*(ord.length-1)))
        // seperate random number gen based off an array of 4 values every time the number is used it removes said number assuring that every number from 1-4 (in the array ord) is called

        if (order[temp] == ord[rand]){
            ans.textContent = answers[curr];
            uli.appendChild(ans);
            ord.splice(ord.indexOf(ord[rand]),1);
            //adds the list item corresponding to the questions answer and removes the number from the ord(temp number holder)
        }
        //if both number gens align and it will every 4 times adds the potato list item

        else{
            uli.appendChild(document.createElement("li"));
            uli.lastChild.textContent = res[rand];
            uli.lastChild.addEventListener("click",function() {
                points = points - 1;
                quest();
            } ); 
            //creates a li and adds a random pull form the tomato(fluff) variable
            ord.splice(ord.indexOf(ord[rand]),1);
            res.splice(res.indexOf(res[rand]),1);
            //removes the used answer number and used wrong answer
        }
        //if it doesn't align adds the tomato list item

        if (res.length < 1){
            res = res.concat(fluff);
        }
        //resets the fluff(tomato storage) and refills it if empty the amount of tomatoes is a multiple of 3 so it doesn't repeat in 1 question
    }
    ord = ord.concat(order);
    //resets the ord variable to an array of 1-4 so it cam pull from it again
};

function results(){
    card.innerHTML = "";
    uli.innerHTML = "";
    timer.textContent = "";
    button.removeEventListener("click",timed);
    // clear out the element and clears out the button element

    card.appendChild(header)
    card.appendChild(uli)
    card.appendChild(button);
    button.textContent = "restart"
    header.innerHTML = "enjoy your potatoes"+"<br></br> potatoes = "+points
    button.addEventListener("click",quizstart );
    //adds needed elements and their corresponding events and text

    highscore.push(points);
    highscore = highscore.sort((a, b) => a - b);
    highscore.reverse();
    //sorts the highscore array by lowest to highest and reverses it
    
    for(var i=0;i<3;i++){
        uli.appendChild(document.createElement("li"));
        uli.lastChild.textContent = highscore[i];
    };
    //adds the high scores to the list 

    while (highscore.length > 4){
        highscore.pop()
    };
    //if the highscore array gets longer than 5(to have a buffer)culls it down to 5 numbers

    localStorage.setItem("scores", JSON.stringify(highscore));
    //stores the new highscores
}

startMenu();
// starts the beginning function

