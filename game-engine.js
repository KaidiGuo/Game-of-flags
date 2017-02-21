var EUCountries = ["ad", "al", "at", "ba", "be", "bg", "by", "ch", "cy", "cz", "de", "dk", "ee", "es", "fi", "fr", "gb", "gr", "hr", "hu", "ie", "is", "it", "lt", "lu", "lv", "me", "rs", "mc", "md", "mk", "nl", "no", "pl", "pt", "ro", "se", "si", "sk", "ru", "sm", "tr", "ua",];
var countriesOnMapProgrammed= [];
loadAllCountriesOnMap();
var threeCountries = ["ba","be","bg"]

var countriesToTest = countriesOnMapProgrammed;

// See differences
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
console.log(EUCountries.diff(countriesOnMapProgrammed));

// Global Parameters
var numberOfTurns = 0;
var numberOfChoices = 3;

// List of Global Variables ---------------------------------------------------
var correctAnswerNumber = 0;
var correctCountryName, correctCountryCca3,correctCountryCca2;


//The Country which is chosen. Default value is answer here.
//The multiple choice categories.
var multipleChoiceArrayNames = [];


var answeredCountry = "";
var score = 0; //Number of correct answers

var turnNumber = -1; // The turn number of the round.


var previousChoiceArray = [];

// Kalingrad
var svgEurope = "";
var kalingrad = "";


// Country Codes
var cca2codes = [];
var cca3codes = [];
var countryNames = [];
var countryNamesAll = [];




window.onload = function() {
    loadCountries();
};

   function loadAllCountriesOnMap() {
    var a = document.getElementById("europe-svg");
     a.addEventListener("load",function(){
                // get the inner DOM of alpha.svg
                var svgDoc = a.contentDocument;
                var getRectanglge= svgDoc.getElementsByTagName("path");
                // get the inner element by id
                var allELements=svgDoc.getElementsByTagName("path");
                for (var i=0; i<allELements.length; i++) {
                    id = allELements[i].id;
                    countriesOnMapProgrammed.push(id);
                };
         //Remove russiak
         var removeThis = "russiak";
         var index = countriesOnMapProgrammed.indexOf(removeThis);
         if (index > -1) {
        countriesOnMapProgrammed.splice(index, 1);
        }
         console.log(countriesOnMapProgrammed);
            }, false);
    }


//First, this loads the countries. And the country buttons
function loadCountries() {

    // Checking if Kalingrad loads.
    svgEurope = document.getElementById("europe-svg").contentDocument;
    kalingrad = svgEurope.getElementById("russiak");
    kalingrad.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:20; stroke-miterlimit:10");
    var childNodeArray = svgEurope.childNodes;
    numberOfTurns=countriesToTest.length;

    d3.json("countries.txt", function (data) {

        for (var i = 0; i < data.length; i++) {

            if (contains(countriesToTest, data[i].cca2.toLowerCase()) === true) {
                countryNames.push(data[i].name.common);
                countryNamesAll.push(data[i].name.common);
                cca3codes.push(data[i].cca3);
                cca2codes.push(data[i].cca2);
            }
        }
// TODO: Change so that only the text will change. No need to add new divs each time.
//creating buttons of countryNames. These are now divs.
     function addButtons(arrayName) {

          for (var i = 0; i < arrayName.length; i++) {
            var btn = document.createElement("div");
            btn.id = arrayName[i];
            btn.className = "countrybutton";
            btn.innerHTML = arrayName[i];
            btn.className = "button";
            btn.style.display = "none";
            document.getElementById("buttonsdiv").appendChild(btn);
        }
     }

        addButtons(countryNamesAll);



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
}

function choices() {

    correctAnswerNumber = Math.ceil(Math.random() * countriesToTest.length - 1);

    function answernumberfunc() {
        if (previousChoiceArray.indexOf(correctAnswerNumber) >= 0) {
            choices();
        }
        else {
            previousChoiceArray.push(correctAnswerNumber);
        }
    }

    function randomNumbersFunction(countOfNumbers) {

        var arr = [];
        while (arr.length < countOfNumbers) {
            var randomnumber = Math.ceil(Math.random() * countriesToTest.length - 1);
            if (randomnumber == correctAnswerNumber) {
                randomnumber = Math.ceil(Math.random() * countriesToTest.length - 1)
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
        randomNumbersArray = arr;
    }

    function randomChoices() {
        function sortNumber(a,b) {
            return a - b;
            }
        allNumbers = [];
        allNumbers.push(correctAnswerNumber);
        for (i=0; i<randomNumbersArray.length; i++){
            allNumbers.push(randomNumbersArray[i]);
        }
        allNumbersSorted= allNumbers.sort(sortNumber);

         for (i=0; i< allNumbersSorted.length; i++) {
             multipleChoiceArrayNames.push(countryNames[allNumbersSorted[i]]);
         }

        for (i=0; i< multipleChoiceArrayNames.length; i++) {
            console.log(multipleChoiceArrayNames[i]);
            document.getElementById(multipleChoiceArrayNames[i]).style.display = "block";
        }
    }


    function changeFlag() {
        var flagCode = correctCountryCca3.toLowerCase();
        document.getElementById("Flag_Image").src = "countries-master/countries-master/data/" + flagCode + ".svg";
        document.getElementById("Flag_Image").style.display = "block";
    }

    answernumberfunc();
    var randomNumbersArray = [];
    randomNumbersFunction(numberOfChoices);
    randomChoices();
    console.log(correctAnswerNumber);
    correctCountryName = countryNames[correctAnswerNumber];
    correctCountryCca3 = cca3codes[correctAnswerNumber];
    correctCountryCca2 = cca2codes[correctAnswerNumber];
    changeFlag();
    decision();
    changehtml();
}
// List of Functions Changing the colour of the country
//Global Variables. The country codes and their original colours.
var countryfillglob = [];
var originalCountryStyles = [];
function colorcountry(stylehere) {
    var countryShapeFill = svgEurope.getElementById(correctCountryCca2.toLowerCase());
    countryfillglob.push(correctCountryCca2.toLowerCase());
    originalCountryStyles.push(countryShapeFill.getAttribute("style"));
    countryShapeFill.setAttribute("style", stylehere);
}
function decision() {

    var buttons = document.getElementsByClassName("button");
    var buttonsCount = buttons.length;

    for (var i = 0; i < buttons.length + 1; i += 1) {



        buttons[i].onclick = function () {

            document.getElementById(correctCountryName).style.display = "none";

            for (i=0; i< multipleChoiceArrayNames.length; i++) {
            document.getElementById(multipleChoiceArrayNames[i]).style.display = "none";
        }
            answeredCountry = this.id;
            // document.getElementById("CountrySelectBox").innerHTML = answeredCountry;
            if (correctCountryName === answeredCountry) {
                var elm = document.getElementById("correct_box")
                var newone = elm.cloneNode(true);
                elm.parentNode.replaceChild(newone, elm);
                document.getElementById("correct_box").classList.add('animate_box');
                score = score + 1;
                console.log("SCORE IS " + score);
                document.getElementById("ScoreBox").innerHTML = score + "/" + countriesToTest.length;
                var newelementdiv = document.createElement("p");
                newelementdiv.id = "Country" + turnNumber;
                newelementdiv.className = "finishednameCorrect";
                newelementdiv.innerHTML = correctCountryName;
                document.getElementById("FinishedCountries").appendChild(newelementdiv);
                
                if (correctCountryName == "Russia") {
                    kalingrad.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                }
                colorcountry("fill:#68C398; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                countryNamesAll.push(correctCountryName);
                cca2codes.push(correctCountryCca2);
                cca3codes.push(correctCountryCca3);
                endofturn();
            } else {
                var elm = document.getElementById("incorrect_box")
                var newone = elm.cloneNode(true);
                elm.parentNode.replaceChild(newone, elm);
                document.getElementById("incorrect_box").classList.add('animate_box');

                var newelementdiv = document.createElement("p");
                newelementdiv.id = "Country" + turnNumber;
                newelementdiv.className = "finishednameWrong";
                newelementdiv.innerHTML = correctCountryName;
                document.getElementById("FinishedCountries").appendChild(newelementdiv);

                if (correctCountryName == "Russia") {
                    kalingrad.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                }
                colorcountry("fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                countryNamesAll.push(correctCountryName);
                cca2codes.push(correctCountryCca2);
                cca3codes.push(correctCountryCca3);
                endofturn();
            }
        }

    }
    console.log("exit onclick function")
}
//changing all of the HTML elements. Essentialy now just changing the score.
function changehtml() {
    document.getElementById("ScoreBox").innerHTML = score + "/" + countriesToTest.length;
     document.getElementById("Flag_Image").style.display = "none";
}
//At the end of each turn.
function endofturn() {
    //document.getElementById("correct_box").classList.toggle('animate_box');
    turnNumber = turnNumber + 1;
    if (turnNumber >= numberOfTurns) {
        endofgame()
    }
    console.log("NUMBER OF COUNTRIES LEFT " + countryNames.length);
    multipleChoiceArrayNames = [];
    choices();
}
//Reset all countries colours Including Kalingrad.
function resetallcolours() {

    kalingrad.setAttribute("style", "fill:#F6DD78; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");

    for (var i = 0; i <= countryfillglob.length; i += 1) {
        console.log(countryfillglob[i]);
        var resetCountry = svgEurope.getElementById(countryfillglob[i]);
        console.log("RESETTING Country");
        if (resetCountry !== null) {
            resetCountry.setAttribute("style", originalCountryStyles[i])
        }
    }
}
//Resets the Box at the bottom of the screen.
function resetAnsweredBox() {
    console.log("RESETANWEREBOX");
    var wrongCountries =
        document.getElementsByClassName("finishednameWrong");

    for (var i = 0; i < wrongCountries.length; i += 1) {
        wrongCountries[i].style.display = "none";
    }
    console.log(wrongCountries);

    var correctcountries = document.getElementsByClassName("finishednameCorrect");
    console.log("correce" + correctcountries);
    for (var i = 0; i < correctcountries.length; i += 1) {
        correctcountries[i].style.display = "none";
    }
    console.log(wrongCountries);
}
function resetChoices() {
    correctCountryName = "";
    multipleChoiceArrayNames= [];
}


//At the end of the game...
function endofgame() {
        alert("End of game! You scored " + score + " out of " + turnNumber);
        resetAnsweredBox();
        previousChoiceArray = [];
        resetallcolours();
        turnNumber = 0;
        score = 0;
//         choices();
        changehtml();
}

function setDisplayStyle(id,displayStyle){
    document.getElementById(id).style.display = displayStyle;
}

//This is the start button which is clicked.
function startbutton() {

//TODO: for each of the elements in multiple choice array !== null.
    if (document.getElementById(correctCountryName) !== null) {
        //If there are buttons, set them to no display.
        for (i=0; i<multipleChoiceArrayNames.length; i++){
            //document.getElementById(multipleChoiceArrayNames[i]).style.display = "none";
            setDisplayStyle(multipleChoiceArrayNames[i],"none");
        }

    }
    document.getElementById("ScoreBox").innerHTML = "0" + "/" + countriesToTest.length;
    document.getElementById("rulebox").style.display = "none";
    document.getElementById("absolutebox").style.display = "none";
    document.getElementById("Flag_Image").style.display = "block";
    document.getElementById("start1").innerHTML = "Restart";


    resetAnsweredBox();
    previousChoiceArray = [];
    resetallcolours();
    turnNumber = 0;
    score = 0;
    resetChoices();
    multipleChoiceArrayNames=[];
    choices();
}


//Describes JavaScript code for pop-up box
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
};
span.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function showBar() {
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
