//Arrays. This is where the country data should go. 
var cca2codes = [];
var cca3codes = [];
var countrynames = [];
var europeancountries = [];
var countriesonmap = ["ad", "al", "am", "at", "az", "ba", "be", "bg", "by", "ca", "ch", "cs", "cy", "cz", "de", "dk", "dz", "ee", "es", "fi", "fr", "gb", "ge", "gl", "gr", "hr", "hu", "ie", "il", "iq", "ir", "is", "it", "jo", "kz", "lb", "li", "lt", "lu", "lv", "ma", "me", "rs", "mc", "md", "mk", "mt", "nl", "no", "pl", "pt", "ro", "sa", "se", "si", "sk", "sm", "sy", "tm", "tn", "tr", "ua", "ru-main", "ru-kaliningrad"];

//First, this loads the countries. And the country buttons 
function loadcountries() {
    d3.json("countries.json", function (data) {

        for (var i = 0; i < data.length; i++) {
            //Selecting only European Countries. 
            if (data[i].region === "Europe") {
                countrynames.push(data[i].name.common);
                cca3codes.push(data[i].cca3);
                cca2codes.push(data[i].cca2);
            }
        }
        //creating buttons of countrynames. These are now divs. 
        for (var i = 0; i < countrynames.length; i++) {
            var btn = document.createElement("div");
            btn.id = countrynames[i];
            btn.className = "countrybutton";
            btn.innerHTML = countrynames[i];
            btn.style.display = "none";
            //            document.body.appendChild(btn);
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

        //Uses the cca3 code. Need to get an array of the cca3 code. 


        //Then return the cca3 code of the random country

        //Change the ccas3 code to lower case. 

        //Change the svg element to reflect the country. 

        //Once it has loaded 
        endofturn();
    })
};

loadcountries();

//Number of countries, 
var numcountries = countrynames.length;
//Generates a random country. 
function randomcountry() {
    var randomcountry = countrynames[Math.floor(Math.random() * countrynames.length)];
    return randomcountry;
};

// List of Variables ---------------------------------------------------
//Random Country Number

//var DisplayCountry = countrynames[randomcountrynumber]; //The flag which is displayed. This is a randomcountry number from the list. 
var globchosenrandomcountrynumber = " ";
var DisplayCountrycca3 = " ";
var DisplayCountrycca2 = "gb";
var DisplayCountry = " ";
var countryChosen // The flag which will be displayed.  
    //The Country which is chosen. Deafault value is answer here.  
var answeredCountry = "Answer Here";
var score = 0; //Number of correct answers
var turnnumber = -1; // The turn number of the round. 
//var rightwrong = correctfunc(DisplayCountry, answeredCountry) //Is the state right or wrong? This will return either "correct" or "incorrect". 
//var colorchange = colorcountryfunc(rightwrong);
//The multiple choice categories. This array will be the number.  
var Multiplechoice = [];
//Choices function. Randomly assigns the coutry and 2 other countries to choose from. 
var currentchoiceone = " ";
var currentchoicetwo = " ";
//Selects and displays the choices on offer.  

//To display the choices. 


function choices() {
    var randomcountrynumber = Math.floor(Math.random() * countrynames.length);
    globchosenrandomcountrynumber = randomcountrynumber;
    var DisplayCountry2 = countrynames[randomcountrynumber];
    var DisplayCountry2indexnumber = countrynames.indexOf(DisplayCountry2);
    var DisplayCountrycca32 = cca3codes[DisplayCountry2indexnumber];
    var DisplayCountrycca22 = cca2codes[DisplayCountry2indexnumber];
    console.log(DisplayCountry2);
    console.log(DisplayCountrycca22);

    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    };
    //Makes sure that the country is on the map. 
    if (contains(countriesonmap, DisplayCountrycca22.toLowerCase()) === false) {
        console.log("NOT ON MAP");
        choices();
    } else {

        console.log("On map")
    };
//Console Log 
    console.log(DisplayCountry2);
    console.log(DisplayCountrycca32);
    console.log(DisplayCountrycca22);
    //The problem is is when they are put back into the array, it changes the array order. 
    DisplayCountry = DisplayCountry2;
    DisplayCountrycca3 = DisplayCountrycca32;
    DisplayCountrycca2 = DisplayCountrycca22;
    //The function that will remove the country from the list. 

    function splicecountry(country) {
        var displaycountryindex = countrynames.indexOf(country);
        if (displaycountryindex > -1) {
            countrynames.splice(displaycountryindex, 1);
            cca3codes.splice(displaycountryindex, 1);
            cca2codes.splice(displaycountryindex, 1);
        }
    };

    Multiplechoice.push(DisplayCountry);

    //Splice the display country from the countrynames array. I could create a forloop with the number of choices, but this could come later.  

    splicecountry(DisplayCountry);
    var choiceone = randomcountry();
    var choiceoneindexnumber = countrynames.indexOf(choiceone);
    var choiceonecca3 = cca3codes[choiceoneindexnumber];
    var choiceonecca2 = cca2codes[choiceoneindexnumber];
    splicecountry(choiceone);
    //Splice choiceone from the countrynames array.
    var choicetwo = randomcountry();
    var choicetwoindexnumber = countrynames.indexOf(choicetwo);
    var choicetwocca3 = cca3codes[choicetwoindexnumber];
    var choicetwocca2 = cca2codes[choicetwoindexnumber];
    //Splice choicetwo from the countrynames array.
    splicecountry(choicetwo);
    Multiplechoice.push(choiceone);
    Multiplechoice.push(choicetwo);

    //add Multiplechoice array back to the countrynames array. 
//Perhaps not push back the display country. 
    cca3codes.push(DisplayCountrycca32, choiceonecca3, choicetwocca3);
    cca2codes.push(DisplayCountrycca22, choiceonecca2, choicetwocca2);
    console.log(cca2codes.length);
    
    countrynames.push(DisplayCountry, choiceone, choicetwo);

    currentchoiceone = choiceone;
    currentchoicetwo = choicetwo;
    changehtml();
    decision();


};

// List of Functions Chaning the colour of the country 
function colorcountry(stylehere) {
    var countryfill = document.getElementById(DisplayCountrycca2.toLowerCase());
    // DisplayCountrycca2.toLowerCase();
    console.log(countryfill);
    countryfill.setAttribute("style", stylehere);
};



function decision() {
    var buttons = document.getElementsByClassName("countrybutton");
    var buttonsCount = buttons.length;
    
    document.getElementById(DisplayCountry).style.display = "inline";
    document.getElementById(currentchoiceone).style.display = "inline";
    document.getElementById(currentchoicetwo).style.display = "inline";

    for (var i = 0; i <= buttonsCount; i += 1) {
        buttons[i].onclick = function () {
            //Make sure no button is displayed. 
            document.getElementById(DisplayCountry).style.display = "none";
            document.getElementById(currentchoiceone).style.display = "none";
            document.getElementById(currentchoicetwo).style.display = "none";
            answeredCountry = this.id;
            document.getElementById("CountrySelectBox").innerHTML = answeredCountry;
            if (document.getElementById("CountrySelectBox").innerHTML == document.getElementById("CountryBox").innerHTML) {
                alert("Correct!");
                colorcountry("stroke-linejoin:round;stroke:#000000;stroke-linecap:round;stroke-width:7.63942308;fill:green");
//Splice the country from the list so it will not be displayed again. 
                
                score = score + 1;
                endofturn();

            } else {
                alert("Incorrect!");
                colorcountry("stroke-linejoin:round;stroke:#000000;stroke-linecap:round;stroke-width:7.63942308;fill:#d81a1a");

                endofturn();

            };
        }
    }
};



function changeflag() {
    var flagcode = DisplayCountrycca3.toLowerCase();
    console.log(flagcode);
    //    document.getElementById("Flag_Image").src = "countries-master/countries-master/data/alb.svg";
    document.getElementById("Flag_Image").src = "countries-master/countries-master/data/" + flagcode + ".svg";

}

//changing all of the HTML elements. It is also set at the beginning.   

function changehtml() {
    changeflag();
    document.getElementById("TurnNumber").innerHTML = turnnumber;
    document.getElementById("ScoreBox").innerHTML = score;
    document.getElementById("CountryBox").innerHTML = DisplayCountry;
    document.getElementById("CountrySelectBox").innerHTML = answeredCountry;
};

//Change html is set at the beginning. Tis could also be set through a button.
changehtml();


//At the end of each turn. 
function endofturn() {
    endofgame();
    randomcountrynumber = Math.floor(Math.random() * countrynames.length);
    Multiplechoice = [];
    turnnumber = turnnumber + 1;
    choices();
    score = score;
    changehtml();
    document.getElementById("CountrySelectBox").innerHTML = "Choose a Country";
};

//Starting the game
function startgame() {
        loadbuttons();
    changehtml();
};

//Reset all countries colours 
function resetallcolours() { 
for (var i = 0; i <= countriesonmap.length; i += 1) {
    
    var resetcountry = document.getElementById(countriesonmap[i]);
    console.log("RESETTING");
     console.log(resetcountry);
    if (resetcountry!== null){
    resetcountry.setAttribute("style", "stroke-linejoin:round;stroke:#000000;stroke-linecap:round;stroke-width:7.63942308;fill:#000000")};
}};


//At the end of the game. What happens? 
function endofgame() {
    if (turnnumber > 3) {
        alert("end of game! You scored " + score + " out of " + turnnumber);
        resetallcolours();
        turnnumber = 0;
        score = 0;
        changehtml();
        
    }
};


//Thes button are not really needed. 
var newroundbutton = document.getElementById("newround");
newroundbutton.onclick = function () {
    endofturn();
};
var startbutton = document.getElementById("startbutton");

startbutton.onclick = function () {
    startgame();
    endofturn();
    
};