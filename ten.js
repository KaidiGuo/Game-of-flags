//Arrays. This is where the country data should go.
var cca2codes = [];
var cca3codes = [];
var countrynames = [];
var countrynamesall = [];
var europeancountries = [];
var countriesonmap = ["ad", "al", "at", "ba", "be", "bg", "by", "ch", "cy", "cz", "de", "dk", "ee", "es", "fi", "fr", "gb", "gr", "hr", "hu", "ie", "is", "it", "lt", "lu", "lv", "me", "rs", "mc", "md", "mk", "nl", "no", "pl", "pt", "ro", "se", "si", "sk","ru", "sm", "tr", "ua", ];

//First, this loads the countries. And the country buttons
function loadcountries() {
    d3.json("countries.txt", function (data) {

        for (var i = 0; i < data.length; i++) {
            //Selecting only European Countries.
            if (contains(countriesonmap, data[i].cca2.toLowerCase()) === true) {
                countrynames.push(data[i].name.common);
                countrynamesall.push(data[i].name.common);
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
            btn.className = "button";

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
        // endofturn();
    })

};

loadcountries();
//Number of countries,
var numcountries = countrynames.length;
//Generates a random country.
function randomcountry(ARRAY) {
    var randomcountry = ARRAY[Math.floor(Math.random() * countrynames.length)];
    return randomcountry;
};



// List of Global Variables ---------------------------------------------------
var globchosenrandomcountrynumber = " ";
var DisplayCountrycca3 = " ";
var DisplayCountrycca2 = " ";
var DisplayCountry = " ";
var countryChosen // The flag which will be displayed.
    //The Country which is chosen. Deafault value is answer here.
var answeredCountry = "";
var score = 0; //Number of correct answers
var turnnumber = -1; // The turn number of the round.
//var rightwrong = correctfunc(DisplayCountry, answeredCountry) //Is the state right or wrong? This will return either "correct" or "incorrect".
//var colorchange = colorcountryfunc(rightwrong);
//The multiple choice categories. This array will be the number.
var Multiplechoice = [];

//Choices function. Randomly assigns the coutry and 2 other countries to choose from.
var currentchoiceone = " ";
var currentchoicetwo = " ";
var currentchoicethree= " ";

//To display the choices.
//If the country has already been chosen.
var alreadychosen = [];

function choices() {
// Correct Answer
var answernumber = Math.ceil(Math.random()*countriesonmap.length-1);

    function answernumberfunc() {
        if(turnnumber > 42){endofgame();}
        if (alreadychosen.indexOf(answernumber) >= 0) {
   choices();
//        console.log(answernumber);
}
        else{alreadychosen.push(answernumber);}
    };

    answernumberfunc();


var fourrandomnumbers = [];
//Creating random answers
function four_random_numbers(){

    var arr = []
while(arr.length < 3){
  var randomnumber=Math.ceil(Math.random()*countriesonmap.length-1)
  if(randomnumber==answernumber){
      randomnumber=Math.ceil(Math.random()*countriesonmap.length-1)
  }
  var found=false;
  for(var i=0;i<arr.length;i++){
	if(arr[i]==randomnumber){found=true; break}
  }
    if(!found)arr[arr.length]=randomnumber;
}
fourrandomnumbers = arr;
    console.log(fourrandomnumbers);
    console.log(alreadychosen);
};
    four_random_numbers();


  console.log("countrynameslength=" + countrynames.length);
    var randomcountrynumber = Math.floor(Math.random() * countrynames.length);
    globchosenrandomcountrynumber = answernumber;
    var DisplayCountry2 = countrynames[answernumber];
    // var DisplayCountry2indexnumber = countrynames.indexOf(DisplayCountry2);

    var DisplayCountrycca32 = cca3codes[answernumber];
    var DisplayCountrycca22 = cca2codes[answernumber];
//    console.log(DisplayCountry2);
//    console.log(DisplayCountrycca22);
    console.log(DisplayCountry2);
    console.log(DisplayCountrycca32);
    console.log(DisplayCountrycca22);
    DisplayCountry = DisplayCountry2;
    DisplayCountrycca3 = DisplayCountrycca32;
    DisplayCountrycca2 = DisplayCountrycca22;
    Multiplechoice.push(DisplayCountry);

    //Splice the display country from the countrynames array. I could create a forloop with the number of choices, but this could come later.


//  splicecountry(DisplayCountry);


  function randomchoices() {
console.log("random choice started");
    var choiceone = countrynames[fourrandomnumbers[0]];

    var choicetwo = countrynames[fourrandomnumbers[1]];
      var choicethree = countrynames[fourrandomnumbers[2]];

      var choiceoneindexnumber = countrynames.indexOf(choiceone);
      var choiceonecca3 = cca3codes[choiceoneindexnumber];
      var choiceonecca2 = cca2codes[choiceoneindexnumber];


      var choicetwoindexnumber = countrynames.indexOf(choicetwo);
      var choicetwocca3 = cca3codes[choicetwoindexnumber];
      var choicetwocca2 = cca2codes[choicetwoindexnumber];

      var choicethreeindexnumber = countrynames.indexOf(choicethree);
      var choicethreecca3 = cca3codes[choicethreeindexnumber];
      var choicethreecca2 = cca2codes[choicethreeindexnumber];
//      splicecountry(choicethree);

      Multiplechoice.push(choiceone);
      Multiplechoice.push(choicetwo);
      Multiplechoice.push(choicethree);

      //add Multiplechoice array back to the countrynames array.
  //Perhaps not push back the display country.
//      cca3codes.push(choiceonecca3, choicetwocca3, choicethreecca3);
//      cca2codes.push(choiceonecca2, choicetwocca2, choicethreecca2);
//      console.log(cca2codes.length);
//      //Note: no DisplayCountry Here, only push if it is INcorrect (i.e to go again).
//      countrynamesall.push(choiceone, choicetwo,choicethree);

      currentchoiceone = choiceone;
      console.log("choiceone " + choiceone);
      currentchoicetwo = choicetwo;
      console.log("choicetwo " + choicetwo);
      currentchoicethree= choicethree;
      console.log("choicethree " + choicethree);
//      if (currentchoiceone==currentchoicetwo|| currentchoicetwo==currentchoicethree|| currentchoiceone==currentchoicethree||DisplayCountry==currentchoiceone|| DisplayCountry==currentchoicetwo|| DisplayCountry==currentchoicethree) {
//      console.log("Duplicate Choice")
//      randomchoices();
//      }
    document.getElementById(DisplayCountry).style.display = "block";
    document.getElementById(currentchoiceone).style.display = "block";
    document.getElementById(currentchoicetwo).style.display = "block";
    document.getElementById(currentchoicethree).style.display = "block";

    console.log("random choice finished");
    };
    randomchoices();







    function changeflag() {
        var flagcode = DisplayCountrycca3.toLowerCase();
//        console.log(flagcode);
        //    document.getElementById("Flag_Image").src = "countries-master/countries-master/data/alb.svg";
//        console.log("flagcode"+flagcode);
        document.getElementById("Flag_Image").src = "countries-master/countries-master/data/" + flagcode + ".svg";

    };


    changeflag();

    decision();
    changehtml();



};

// List of Functions Chaning the colour of the country
//Global Variables. The country codes and their original colours.
var countryfillglob = [];
var countrystyleglob=[];
function colorcountry(stylehere) {
    var countryfill = document.getElementById(DisplayCountrycca2.toLowerCase());
    countryfillglob.push(DisplayCountrycca2.toLowerCase());
    // DisplayCountrycca2.toLowerCase();
//    console.log(countryfill);
    var originalstyle = countryfill.getAttribute("style");
    console.log(originalstyle);
    countrystyleglob.push(originalstyle);
    //Need to push this original style and the Id to a separate array.
    countryfill.setAttribute("style", stylehere);
};

function nobuttons(){  var buttons = document.getElementsByClassName("button");
    var buttonsCount = buttons.length;

                     for (var i = 0; i < buttonsCount; i += 1){
                if(buttons[i].style.display="block"){
                buttons[i].style.display="none"
            }}};

function decision() {
    console.log("enterdecision");
    var buttons = document.getElementsByClassName("button");
    var buttonsCount = buttons.length;
    console.log(buttons);
    console.log("length of buttons is" + buttonsCount);

//     function nobuttons(){ for (var i = 0; i <= buttonsCount; i += 1){
//
//                if(buttons[i].style.display="block"){
//                buttons[i].style.display="none"
//            }}};

    //THE CODE WORKS FOR buttons.length
    for (var i = 0; i < buttons.length +1; i += 1) {
console.log("enterforloop");


          buttons[i].onclick = function () {
               console.log("Clicked on a button")
               console.log( "Button Count is " + buttonsCount)
//            console.log(buttons[i]);
            //Make sure no button is displayed.

            document.getElementById(DisplayCountry).style.display = "none";
              console.log("Set the Button" +DisplayCountry+ "to None");
            document.getElementById(currentchoiceone).style.display = "none";
            document.getElementById(currentchoicetwo).style.display = "none";
             document.getElementById(currentchoicethree).style.display = "none";
            answeredCountry = this.id;
            // document.getElementById("CountrySelectBox").innerHTML = answeredCountry;
            console.log(answeredCountry+"   ");
            console.log(DisplayCountry+"   ");
            if (DisplayCountry===answeredCountry) {
              // alert("Correct!");
              score = score + 1;
              console.log("SCORE IS " + score);

              document.getElementById("ScoreBox").innerHTML = score + "/" +countriesonmap.length;
              var newelementdiv = document.createElement("p");
              newelementdiv.id="Country"+turnnumber;
              newelementdiv.className="finishednameCorrect";
              newelementdiv.innerHTML=DisplayCountry;


              document.getElementById("FinishedCountries").appendChild(newelementdiv);

            if(DisplayCountry=="Russia"){
             var kalingradshape =   document.getElementById("russiak");
            console.log(kalingradshape);
            kalingradshape.setAttribute("style", "fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
            };

              colorcountry("fill:#68C398; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
              countrynamesall.push(DisplayCountry);
              cca2codes.push(DisplayCountrycca2);
              cca3codes.push(DisplayCountrycca3);
              endofturn();
            }else {
              // alert("<No<");
              var newelementdiv = document.createElement("p");
              newelementdiv.id="Country"+turnnumber;
              newelementdiv.className="finishednameWrong";
              newelementdiv.innerHTML=DisplayCountry;
              document.getElementById("FinishedCountries").appendChild(newelementdiv);


                if(DisplayCountry=="Russia"){
             var kalingradshape =   document.getElementById("russiak");
            kalingradshape.setAttribute("style","fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
            };


                colorcountry("fill:#F47A6F; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");
              countrynamesall.push(DisplayCountry);
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
    document.getElementById("ScoreBox").innerHTML = score + "/" +countriesonmap.length;
};


//At the end of each turn.
function endofturn() {
    turnnumber = turnnumber + 1;
    if (turnnumber > 42){ endofgame()};
    console.log("NUMBER OF COUNTRIES LEFT " + countrynames.length)
    Multiplechoice = [];
    choices();
};


//Reset all countries colours Including Kalingrad.
function resetallcolours() {

var kalingrad = document.getElementById("russiak");

    kalingrad.setAttribute("style", "fill:#F6DD78; stroke:#FFFFFF; stroke-width:0.5; stroke-miterlimit:10");

for (var i = 0; i <= countryfillglob.length; i += 1) {
//console.log(countryfillglob)
    var resetcountry = document.getElementById(countryfillglob[i]);
//    console.log(resetcountry);
    console.log("RESETTING Country");
//     console.log(resetcountry);
    if (resetcountry!== null){
    resetcountry.setAttribute("style", countrystyleglob[i])};
}};

//Resets the Box at the bottom of the screen.
function resetansweredbox() {
     console.log("RESETANWEREBOX");
    var wrongcountries =
 document.getElementsByClassName("finishednameWrong");

    for (var i = 0; i < wrongcountries.length; i += 1) {
 wrongcountries[i].style.display = "none"; }
    console.log(wrongcountries);

   var correctcountries = document.getElementsByClassName("finishednameCorrect");
    console.log("correce"+correctcountries);
     for (var i = 0; i < correctcountries.length; i += 1) {
 correctcountries[i].style.display = "none"; }
    console.log(wrongcountries);
};


//At the end of the game.What happens?
function endofgame() {
     {
        alert("End of game! You scored " + score + " out of " + turnnumber);
        resetansweredbox();
        alreadychosen = [];
        resetallcolours();
        turnnumber = 0;
        score = 0;
//         choices();
        changehtml();

    }
};


//This is the start button which is clicked.
function startbutton() {

      if(document.getElementById(DisplayCountry) !== null && document.getElementById(currentchoiceone) !== null && document.getElementById(currentchoicetwo) !== null && document.getElementById(currentchoicethree)!== null) {
 //If there are buttons, set them to no display.
    document.getElementById(DisplayCountry).style.display = "none";
            document.getElementById(currentchoiceone).style.display = "none";
            document.getElementById(currentchoicetwo).style.display = "none";
             document.getElementById(currentchoicethree).style.display = "none";

            };
    document.getElementById("ScoreBox").innerHTML = "0" + "/" +countriesonmap.length;
    document.getElementById("rulebox").style.display = "none";
    document.getElementById("absolutebox").style.display = "none";
    document.getElementById("Flag_Image").style.display = "block";

    document.getElementById("start1").innerHTML = "Restart";


    resetansweredbox();
        alreadychosen = [];
        resetallcolours();
    turnnumber = 0;
        score = 0;
         choices();
};
//This is the STOP GAME button
function stopgamebutton() {
    console.log("RESTART BUTTON");
    document.getElementById("ScoreBox").innerHTML = "0" + "/" +countriesonmap.length;
    document.getElementById("Flag_Image").src = "";
      document.getElementById(DisplayCountry).style.display = "none";
            document.getElementById(currentchoiceone).style.display = "none";
            document.getElementById(currentchoicetwo).style.display = "none";
             document.getElementById(currentchoicethree).style.display = "none";
};


//Descibes JavaScript code for pop-up box
 var modal = document.getElementById('myModal');
 var btn = document.getElementById("myBtn");
 var span = document.getElementsByClassName("close")[0];
 btn.onclick = function() {
     modal.style.display = "block";
 }
 span.onclick = function() {
     modal.style.display = "none";
 }
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }

function showbar(){
   document.getElementById("mybar").style.display = "block";
    document.getElementById("Continue").style.display = "block";
    document.getElementById("sstart").style.display = "none";

}
var Mapview = 1;
 function see(){
   if (Mapview==1) {
     document.getElementById("mybar").style.display = "none";
     Mapview=0;
   }
   else if (Mapview==0) {
     document.getElementById("mybar").style.display = "block";
     Mapview=1;


   }

 }





