function gettingchoices(numberofchoices){
	var allcca2 = [];
	var allcca3=[]; 
	var allcountrynames = [];
	for (var i=0; i<=numberofchoices;i += 1)
	{var choice = randomcountry();
    var choiceindexnumber = countrynames.indexOf(choice);
    var choicecca3 = cca3codes[choiceindexnumber];
    var choicecca2 = cca2codes[choiceindexnumber];
	splicecountry(choice); 
	Multiplechoice.push(choice);
	allcca2.push(choicecca2);
	allcca3.push(choicecca3);
	allcountrynames.push(choice);
	 document.getElementById(choice).style.display = "inline"; 
	 }
	 cca2codes.push(allcca2);
	 cca3codes.push(allcca3); 
	 countrynames.push(allcountrynames); 
	 console.log(cca2codes.length);
}




	