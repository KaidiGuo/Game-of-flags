// List of Global Variables ---------------------------------------------------
var globchosenrandomcountrynumber = " ";
var DisplayCountrycca3 = " ";
var DisplayCountrycca2 = " ";
var DisplayCountry = " ";
//The Country which is chosen. Default value is answer here.

var answeredCountry = "";
var score = 0; //Number of correct answers
var turnNumber = -1; // The turn number of the round.


//The multiple choice categories.
var multipleChoiceArray = [];

//Choices function
var currentchoiceone = " ";
var currentchoicetwo = " ";
var currentchoicethree = " ";

//To display the choices.
//If the country has already been chosen.
var alreadychosen = [];

// Kalingrad
var svgEurope = "";
var kalingrad = "";


// Country Codes
var cca2codes = [];
var cca3codes = [];
var countryNames = [];
var countryNamesAll = [];
var countriesOnMap = ["ad", "al", "at", "ba", "be", "bg", "by", "ch", "cy", "cz", "de", "dk", "ee", "es", "fi", "fr", "gb", "gr", "hr", "hu", "ie", "is", "it", "lt", "lu", "lv", "me", "rs", "mc", "md", "mk", "nl", "no", "pl", "pt", "ro", "se", "si", "sk", "ru", "sm", "tr", "ua",];



window.onload = function() {
loadCountries();
};


//First, this loads the countries. And the country buttons
function loadCountries() {

    // Checking if Kalingrad loads.
    svgEurope = document.getElementById("europe-svg").contentDocument;
    kalingrad = svgEurope.getElementById("russiak");
    kalingrad.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:20; stroke-miterlimit:10");

    d3.json("countries.txt", function (data) {

        for (var i = 0; i < data.length; i++) {
            //Selecting only European Countries and loading them.
            if (contains(countriesOnMap, data[i].cca2.toLowerCase()) === true) {
                countryNames.push(data[i].name.common);
                countryNamesAll.push(data[i].name.common);
                cca3codes.push(data[i].cca3);
                cca2codes.push(data[i].cca2);
            }
        }
//creating buttons of countryNames. These are now divs.
        for (var i = 0; i < countryNames.length; i++) {
            var btn = document.createElement("div");
            btn.id = countryNames[i];
            btn.className = "countrybutton";
            btn.innerHTML = countryNames[i];
            btn.className = "button";
            btn.style.display = "none";
            document.getElementById("buttonsdiv").appendChild(btn);
        }


        // If it contains an array.
        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }
    })

};


function choices() {
// Correct Answer
    var answerNumber = Math.ceil(Math.random() * countriesOnMap.length - 1);

    function answernumberfunc() {
        if (turnNumber > 42) {
            endofgame();
        }
        if (alreadychosen.indexOf(answerNumber) >= 0) {
            choices();
        }
        else {
            alreadychosen.push(answerNumber);
        }
    };



//Creating random answers
    function funcFourRanNums() {

        var arr = []
        while (arr.length < 3) {
            var randomnumber = Math.ceil(Math.random() * countriesOnMap.length - 1)
            if (randomnumber == answerNumber) {
                randomnumber = Math.ceil(Math.random() * countriesOnMap.length - 1)
            }
            var found = false;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == randomnumber) {
                    found = true;
                    break
                }
            }
            if (!found)arr[arr.length] = randomnumber;
        }
        fourRandomNumbers = arr;
    };




    function randomChoices() {
        var choiceOne = countryNames[fourRandomNumbers[0]];
        var choiceTwo = countryNames[fourRandomNumbers[1]];
        var choiceThree = countryNames[fourRandomNumbers[2]];

        multipleChoiceArray.push(choiceOne);
        multipleChoiceArray.push(choiceTwo);
        multipleChoiceArray.push(choiceThree);
        
        currentchoiceone = choiceOne;
        console.log("choiceOne " + choiceOne);
        currentchoicetwo = choiceTwo;
        console.log("choiceTwo " + choiceTwo);
        currentchoicethree = choiceThree;
        console.log("choiceThree " + choiceThree);
        for (i=0; i< multipleChoiceArray.length-1; i++) {
            document.getElementById(multipleChoiceArray[i]).style.display = "block";
        }
        console.log("random choice finished");
    };



    function changeflag() {
        var flagcode = DisplayCountrycca3.toLowerCase();
        document.getElementById("Flag_Image").src = "countries-master/countries-master/data/" + flagcode + ".svg";
    };

 answernumberfunc();
    var fourRandomNumbers = [];
    funcFourRanNums();
    DisplayCountry = countryNames[answerNumber];
    DisplayCountrycca3 = cca3codes[answerNumber];
    DisplayCountrycca2 = cca2codes[answerNumber];
    multipleChoiceArray.push(DisplayCountry);
    console.log(multipleChoiceArray);
    randomChoices();
    changeflag();
    decision();
    changehtml();
};

// List of Functions Changing the colour of the country
//Global Variables. The country codes and their original colours.
var countryfillglob = [];
var countrystyleglob = [];
function colorcountry(stylehere) {
    var countryShapeFill = svgEurope.getElementById(DisplayCountrycca2.toLowerCase());
    countryfillglob.push(DisplayCountrycca2.toLowerCase());

    var originalstyle = countryShapeFill.getAttribute("style");
    console.log(originalstyle);
    countrystyleglob.push(originalstyle);
    //Need to push this original style and the Id to a separate array.
    countryShapeFill.setAttribute("style", stylehere);
};



function decision() {
    console.log("enterdecision");
    var buttons = document.getElementsByClassName("button");
    var buttonsCount = buttons.length;
    console.log(buttons);
    console.log("length of buttons is" + buttonsCount);


    for (var i = 0; i < buttons.length + 1; i += 1) {
        console.log("enterforloop");


        buttons[i].onclick = function () {
            console.log("Clicked on a button")
            console.log("Button Count is " + buttonsCount)
//            console.log(buttons[i]);
            //Make sure no button is displayed.
            console.log("display country is " + DisplayCountry);
            document.getElementById(DisplayCountry).style.display = "none";
            console.log("Set the Button" + DisplayCountry + "to None");
            document.getElementById(currentchoiceone).style.display = "none";
            document.getElementById(currentchoicetwo).style.display = "none";
            document.getElementById(currentchoicethree).style.display = "none";
            answeredCountry = this.id;
            // document.getElementById("CountrySelectBox").innerHTML = answeredCountry;
            console.log(answeredCountry + "   ");
            console.log(DisplayCountry + "   ");
            if (DisplayCountry === answeredCountry) {
                // alert("Correct!");
                score = score + 1;
                console.log("SCORE IS " + score);

                document.getElementById("ScoreBox").innerHTML = score + "/" + countriesOnMap.length;
                var newelementdiv = document.createElement("p");
                newelementdiv.id = "Country" + turnNumber;
                newelementdiv.className = "finishednameCorrect";
                newelementdiv.innerHTML = DisplayCountry;


                document.getElementById("FinishedCountries").appendChild(newelementdiv);

                if (DisplayCountry == "Russia") {
                    kalingrad.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                }
                ;

                colorcountry("fill:#68C398; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                countryNamesAll.push(DisplayCountry);
                cca2codes.push(DisplayCountrycca2);
                cca3codes.push(DisplayCountrycca3);
                endofturn();
            } else {
                var newelementdiv = document.createElement("p");
                newelementdiv.id = "Country" + turnNumber;
                newelementdiv.className = "finishednameWrong";
                newelementdiv.innerHTML = DisplayCountry;
                document.getElementById("FinishedCountries").appendChild(newelementdiv);


                if (DisplayCountry == "Russia") {
                    kalingrad.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                }
                ;


                colorcountry("fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                countryNamesAll.push(DisplayCountry);
                cca2codes.push(DisplayCountrycca2);
                cca3codes.push(DisplayCountrycca3);
                endofturn();
            }
        }

    }
    console.log("exit onclick function")
};


//changing all of the HTML elements. Essentialy now just changing the score.
function changehtml() {
    document.getElementById("ScoreBox").innerHTML = score + "/" + countriesOnMap.length;
};


//At the end of each turn.
function endofturn() {
    turnNumber = turnNumber + 1;
    if (turnNumber > 42) {
        endofgame()
    }
    ;
    console.log("NUMBER OF COUNTRIES LEFT " + countryNames.length)
    multipleChoiceArray = [];
    choices();
};


//Reset all countries colours Including Kalingrad.
function resetallcolours() {

    kalingrad.setAttribute("style", "fill:#F6DD78; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");

    for (var i = 0; i <= countryfillglob.length; i += 1) {
        var resetCountry = document.getElementById(countryfillglob[i]);
        console.log("RESETTING Country");
        if (resetCountry !== null) {
            resetCountry.setAttribute("style", countrystyleglob[i])
        }
        ;
    }
};

//Resets the Box at the bottom of the screen.
function resetansweredbox() {
    console.log("RESETANWEREBOX");
    var wrongcountries =
        document.getElementsByClassName("finishednameWrong");

    for (var i = 0; i < wrongcountries.length; i += 1) {
        wrongcountries[i].style.display = "none";
    }
    console.log(wrongcountries);

    var correctcountries = document.getElementsByClassName("finishednameCorrect");
    console.log("correce" + correctcountries);
    for (var i = 0; i < correctcountries.length; i += 1) {
        correctcountries[i].style.display = "none";
    }
    console.log(wrongcountries);
};

function resetChoices() {
    DisplayCountry = "";
    currentchoiceone= "";
    currentchoicetwo= "";
    currentchoicethree= "";
}


//At the end of the game.What happens?
function endofgame() {
    {
        alert("End of game! You scored " + score + " out of " + turnNumber);
        resetansweredbox();
        alreadychosen = [];
        resetallcolours();
        turnNumber = 0;
        score = 0;
//         choices();
        changehtml();

    }
};


//This is the start button which is clicked.
function startbutton() {
    console.log("start button function clicked");
    console.log("DisplayCOuntry is " + DisplayCountry);
    console.log("DisplayCOuntry is " + currentchoiceone);
    console.log("DisplayCOuntry is " + currentchoicetwo);
    console.log(document.getElementById(currentchoicethree));

    if (document.getElementById(DisplayCountry) !== null && document.getElementById(currentchoiceone) !== null) {
        //If there are buttons, set them to no display.
        console.log("setting to none")
        document.getElementById(DisplayCountry).style.display = "none";
        document.getElementById(currentchoiceone).style.display = "none";
        document.getElementById(currentchoicetwo).style.display = "none";
        document.getElementById(currentchoicethree).style.display = "none";

    };
    document.getElementById("ScoreBox").innerHTML = "0" + "/" + countriesOnMap.length;
    document.getElementById("rulebox").style.display = "none";
    document.getElementById("absolutebox").style.display = "none";
    document.getElementById("Flag_Image").style.display = "block";

    document.getElementById("start1").innerHTML = "Restart";


    resetansweredbox();
    alreadychosen = [];
    resetallcolours();
    turnNumber = 0;
    score = 0;
    resetChoices();
    multipleChoiceArray=[];
    choices();
};

//Descibes JavaScript code for pop-up box
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showbar() {
    document.getElementById("mybar").style.display = "block";
    document.getElementById("Continue").style.display = "block";
    document.getElementById("sstart").style.display = "none";

}
var Mapview = 1;
function see() {
    if (Mapview == 1) {
        document.getElementById("mybar").style.display = "none";
        Mapview = 0;
    }
    else if (Mapview == 0) {
        document.getElementById("mybar").style.display = "block";
        Mapview = 1;

    }

}
