var card = document.getElementById("card");
var timer = document.getElementById("timer");


var button = document.createElement("button");
var header = document.createElement("h2");
var texts = document.createElement("p1");
var uli = document.createElement("ul");
var ans = document.createElement("li");

var questions = ["1","2","3","4","5"]
var answers = ["1","2","3","4","5"];
var fluff = ["01","02","03","04","05","06","07","08","09","010","011","012","013","014","015"]
var points = 0;
var time = 40;
var order = [1,2,3,4]
var ord = []
ord = ord.concat(order)
var res = [];
res = res.concat(fluff);


button.style.width = "fit-content";
button.style.alignSelf = "center"


ans.addEventListener("click", function() {
    points = points + 1;
    quest();
}); 
//event listener moved here to prevent multiple event listeners added to same item

//adds list option and corresponding answer the array is ordered such that the answer is the same numberin the array as the corresponding question

//setting global elements and definging certain things


function startMenu(){

    header.textContent = "Welcome to the Code Game!";
    texts.textContent = "to play the game press the start button just down there";
    button.textContent = "start";
    // elements text

    card.appendChild(header);
    card.appendChild(texts);
    card.appendChild(button);
    // put the stuff on the quiz 

    button.addEventListener("click",quizstart,once);
    //goes to the next function when start button is pressed
}

function quizstart(){
    card.innerHTML = "";

    texts.textContent = "press what you think is the correct answer if you get it wrong you lose a point if you get it right you get a a point the timer is set to 40 seconds"
    button.textContent = "Start for real this time"
    card.appendChild(texts);
    card.appendChild(button);

    button.addEventListener("click",quest,once);
}
//instruction text and the actual start button

function quest(){
    card.innerHTML = "";
    uli.innerHTML = "";
    //clears the card when it starts and every new question

    setTimeout(results, 4000)
    //sets the timer to 40 seconds and runs the results function when time runs out

    var curr = Math.floor((Math.random() * (questions.length)));
    //random number put into variable because i had 2 arrays that needed the same random number

    header.textContent = questions[curr];
    //adds the question to card

    card.appendChild(header);
    card.appendChild(uli);
//    uli.appendChild(ans);
    //adds the header, answer, and ordered list to card

    var temp = Math.floor(Math.random() * (order.length))
    //random number gen
    for (var i=0; i<4; i++){ 

        var rand = (Math.floor(Math.random()*(ord.length)))

        if (order[temp] == ord[rand]){
            ans.textContent = answers[curr];
            uli.appendChild(ans);
            ord.splice(ord.indexOf(ord[rand]),1);
        }
        else{
            uli.appendChild(document.createElement("li"));
            uli.lastChild.textContent = res[rand];
            uli.lastChild.addEventListener("click",function() {
                points = points - 1;
                quest();
            },once); 
            ord.splice(ord.indexOf(ord[rand]),1);
            res.splice(res.indexOf(res[rand]),1);
        }
        if (res.length < 1){
            res = res.concat(fluff);
        }
    }
    ord = ord.concat(order);

/*
    ans.textContent= answers[curr];
    //adds the real answer as a part of the list under question and fills the list object with the answer

    ans.setAttribute("value",ord[Math.floor(Math.random()*(ord.length-1))])

    for (var i = 0; i<3; i++) {

        var temp = res[Math.floor(Math.random() * (res.length-1))];

        uli.appendChild(document.createElement("li"));
        uli.lastChild.textContent = temp;
        uli.lastChild.setAttribute("value",2)
        uli.lastChild.addEventListener("click",function() {
            points = points - 1;
            quest();
        })
        res.splice(res.indexOf(temp),1);
        //fills up the next three items on the list with items from the fluff list filtered through the res array and removes used items from the array until res is fully empty and res is filled to an amout that is a multiple of three to prevent doubles 

        if (res.length < 1){
        res = res.concat(fluff);
        }
        // refills the res array when it is empty
    };
    */
};

function results(){
    card.innerHTML = "";
    uli.innerHTML = "";
    button.removeEventListener(start);

    card.appendChild(header)
    card.appendChild(uli)
    header.innerHTML = "hope you had fun"+"<br></br> score = "+points

    for(var i=0;i<3;i++){
        uli.appendChild(document.createElement("li"));
        uli.lastChild.textContent = (i+1);
    };

    button.textContent = "restart"
    button.addEventListener("click",quizstart,once);
    card.appendChild(button);

}

startMenu();

