var card = document.getElementById("card");


var button = document.createElement("button");
var header = document.createElement("h2")
var texts = document.createElement("p1")
//crating common use elements
function startMenu(){

    header.textContent = "Welcome to the Code Game!";
    texts.textContent = "to play the game press the start button just down there";
    button.textContent = "start";
    // elements style and text

    button.style.width = "fit-content";
    button.style.alignSelf = "center"

    card.appendChild(header);
    card.appendChild(texts);
    card.appendChild(button);
    // put the stuff on the quiz card

    button.addEventListener("click",quizstart)
    //goes to the next function when start button is pressed
}

function quizstart(){
    card.innerHTML = " ";
    texts.textContent = "so after you press the play button you select the choice that you think is the right answer the timer is set to 40 seconds so get as much or everything done until then good luck"
    button.textContent = "Start for real this time"
    card.appendChild(texts);
    card.appendChild(button)
}
startMenu();