var EUCountries = ["ad", "al", "at", "ba", "be", "bg", "by", "ch", "cy", "cz", "de", "dk", "ee", "es", "fi", "fr", "gb", "gr", "hr", "hu", "ie", "is", "it", "lt", "lu", "lv", "me", "rs", "mc", "md", "mk", "nl", "no", "pl", "pt", "ro", "se", "si", "sk", "ru", "sm", "tr", "ua",];
var countriesOnMapProgrammed= [];

var threeCountries = ["ba","be","bg"];
var countriesToTest = countriesOnMapProgrammed;

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


loadAllCountriesOnMap();

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
         var removeThis = "russiak";
         var index = countriesOnMapProgrammed.indexOf(removeThis);
         if (index > -1) {
        countriesOnMapProgrammed.splice(index, 1);
        }
            }, false);
    }


//First, this loads the countries. And the country buttons
function loadCountries() {
    svgEurope = document.getElementById("europe-svg").contentDocument;
    kalingrad = svgEurope.getElementById("russiak");
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

function deleteChildNodes(parentNodeName) {
              node = document.getElementById(parentNodeName);
            while (node.hasChildNodes()) {
                node.removeChild(node.lastChild);
                }
          }

function addButtons() {
      for (var i = 0; i <= numberOfChoices; i++) {
        var btn = document.createElement("div");
        btn.id = "button#" + i ;
        btn.className = "button";
        btn.classList.add("permanentbutton");
        btn.style.display = "block";
        document.getElementById("buttonsdiv").appendChild(btn);
    }
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
        multipleChoiceArrayNames=[];
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
    }

      function addButtonText(arrayName) {
          for (var i = 0; i < arrayName.length; i++) {
            var btn = document.createElement("div");
            btn.id = arrayName[i];
            btn.className = "countrybutton";
            btn.className= "countrybutton-text"
            btn.innerHTML = arrayName[i];
            btn.className = "button";
            btn.style.display = "block";
            var btnId = ("button#" + i).toString()
            deleteChildNodes(btnId)
            document.getElementById(btnId).appendChild(btn);
            btn.addEventListener("click", decision);
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
    correctCountryName = countryNames[correctAnswerNumber];
    correctCountryCca3 = cca3codes[correctAnswerNumber];
    correctCountryCca2 = cca2codes[correctAnswerNumber];
    changeFlag();
    addButtonText(multipleChoiceArrayNames);
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
            answeredCountry = this.id;
            answeredCountryButton = document.getElementById(answeredCountry);
            animatedDiv= document.getElementById("buttonsdiv");

            if (correctCountryName === answeredCountry) {
                //Animate Element
                animatedDiv.classList.add("right_box");
                setTimeout(function () {
                    animatedDiv.classList.remove("right_box");
                },500);
                score = score + 1;
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

            } else {
               //Animate
                 animatedDiv.classList.add("wrong_box");
                setTimeout(function () {
                    animatedDiv.classList.remove("wrong_box");
                },500);

                var newelementdiv = document.createElement("p");
                newelementdiv.id = "Country" + turnNumber;
                newelementdiv.className = "finishednameWrong";
                newelementdiv.innerHTML = correctCountryName;

                document.getElementById("FinishedCountries").appendChild(newelementdiv);

                if (correctCountryName == "Russia") {
                    kalingrad.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
                }
                colorcountry("fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
            }

                countryNamesAll.push(correctCountryName);
                cca2codes.push(correctCountryCca2);
                cca3codes.push(correctCountryCca3);
                changehtml();
                endofturn();
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
        return
    }
    if(turnNumber<numberOfTurns) {
        multipleChoiceArrayNames = [];
        choices();
    }
};
//Reset all countries colours Including Kalingrad.
function resetallcolours() {

    kalingrad.setAttribute("style", "fill:#F6DD78; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");

    for (var i = 0; i <= countryfillglob.length; i += 1) {
        var resetCountry = svgEurope.getElementById(countryfillglob[i]);
        if (resetCountry !== null) {
            resetCountry.setAttribute("style", originalCountryStyles[i])
        }
    }
}


//Resets the Box at the bottom of the screen.
function resetAnsweredBox() {
    var wrongCountries =
        document.getElementsByClassName("finishednameWrong");

    for (var i = 0; i < wrongCountries.length; i += 1) {
        wrongCountries[i].style.display = "none";
    }

    var correctcountries = document.getElementsByClassName("finishednameCorrect");
    for (var i = 0; i < correctcountries.length; i += 1) {
        correctcountries[i].style.display = "none";
    }
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
        deleteChildNodes("buttonsdiv")
        changehtml();
           document.getElementById("ScoreBox").innerHTML = "0" + "/" + countriesToTest.length;
    document.getElementById("rulebox").style.display = "block";
    document.getElementById("absolutebox").style.display = "block";
        document.getElementById("start1").innerHTML = "Start";
}

function startbutton() {
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
    deleteChildNodes("buttonsdiv")
    resetChoices();
    multipleChoiceArrayNames=[];
    addButtons();
    choices();
    st.start();
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

//Code from https://hacks.mozilla.org/2012/04/click-highlights-with-css-transitions/

;;;/*to be safe*/(function(){
var plot = document.createElement('div'),
    pressed = false;
plot.id = 'lookatmeiamhere';
document.body.appendChild(plot);
var offset = plot.offsetWidth / 2;
document.addEventListener('mousedown', function(ev) {
  document.body.classList.add('down');
  pressed = true;
  moveplot( ev.pageX, ev.pageY );
}, false );
document.addEventListener( 'mouseup', function(ev) {
  document.body.classList.remove('down');
  pressed = false;
},  false );
function moveplot( x, y ) {
  plot.style.left = x - offset + 'px';
  plot.style.top = y - offset + 'px';
}
document.addEventListener( 'mousemove', function(ev) {
  if (pressed) { moveplot( ev.pageX, ev.pageY ); }
}, false );
})();

// For Stopwatch taken from http://stackoverflow.com/questions/1210701/compute-elapsed-time
var st = new Stopwatch();
st.start(); //Start the stopwatch
st.getSeconds();

function Stopwatch(){
  var startTime, endTime, instance = this;

  this.start = function (){
    startTime = new Date();
  };

  this.stop = function (){
    endTime = new Date();
  }

  this.clear = function (){
    startTime = null;
    endTime = null;
  }

  this.getSeconds = function(){
    if (!endTime){
    return 0;
    }
    return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }

  this.getMinutes = function(){
    return instance.getSeconds() / 60;
  }
  this.getHours = function(){
    return instance.getSeconds() / 60 / 60;
  }
  this.getDays = function(){
    return instance.getHours() / 24;
  }
}

