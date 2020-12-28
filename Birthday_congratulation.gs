var TRIGGER_NAME = "dailyCongratulations"
var LABELS_TO_CONGRATULATE = ["BIRTHDAY_LABEL"] //Write it down as it appers on the search bar of gmail when you click on the label, 
// without the "label:" example: "masterlabel-slavelabel-subslavelabel-birthday"
var DONE_LABEL = ["BIRTHDAY_DONE_LABEL"]	//Write it down as it where a folder system example:"master/slave/Birthday/Done"
var PAGE_SIZE = 150;
var TIMEZONE = "AEST";
var GIPHY_API_KEY="GIPHY_API_KEY";
function Initialize() {
  return;
}

function Install() {

  // First run 2 mins after install
  ScriptApp.newTrigger(TRIGGER_NAME)
           .timeBased()
           .at(new Date((new Date()).getTime() + 1000*60*2))
           .create();
  
  // Run daily there after
  ScriptApp.newTrigger(TRIGGER_NAME)
           .timeBased().everyDays(1).create();

}
function Uninstall() {
  
  var triggers = ScriptApp.getProjectTriggers();
  for (var i=0; i<triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
}

function getGIF() {
	// Giphy API defaults
	const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		key: GIPHY_API_KEY,
		tag: "birthday",
		type: "random",
		rating: "nsfw"
	};  
// Giphy API URL
var giphyURL = giphy.baseURL +giphy.type+"?api_key="+giphy.key+"&tag="+giphy.tag+"&rating="+giphy.rating;
var response = UrlFetchApp.fetch(giphyURL);
var jsonresponse = response.getContentText();
var jsondata = JSON.parse(jsonresponse);
var gifURL = jsondata.data.images.original.url;
//Logger.log(gifURL);
return gifURL
}
function getMotivationalQuote(){
  var Quotes=UrlFetchApp.fetch("https://type.fit/api/quotes");
  var jsonQuotes = JSON.parse(Quotes);
  //Logger.log(jsonQuotes)
  var randNumber=Math.floor(Math.random() * 101);
  Logger.log(jsonQuotes[randNumber].text)
  Logger.log(jsonQuotes[randNumber].author)
  return jsonQuotes[randNumber]
}
function getShowerThought(){
  var Quotes=UrlFetchApp.fetch("https://www.reddit.com/r/showerthoughts/top.json?sort=top&t=week&limit=100");
  var jsonQuotes = JSON.parse(Quotes);
  //Logger.log(jsonQuotes)
  var randNumber=Math.floor(Math.random() * 101);
  Logger.log(jsonQuotes.data.children[randNumber].data.title)
  Logger.log(jsonQuotes.data.children[randNumber].data.author)
  return jsonQuotes.data.children[randNumber].data
}
function getBirthdayCongratulation(){
  var Congratulations=UrlFetchApp.fetch("https://raw.githubusercontent.com/itriplek/birthday-quotes-with-relationships/master/birthday-quotes-with-relationship-formatted.json");
  var jsonCongratulations= JSON.parse(Congratulations);
  var randNumber=Math.floor(Math.random() * 1001);
  Logger.log(jsonCongratulations[randNumber].quote);
  return jsonCongratulations[randNumber].quote;
  
}
function test(){
    var age = new Date();  
  age.setDate(age.getDate() - 1); //Esto rula una vez al dia mas o menos, asi que solo queremos responder los correos con un dia de antiguedad    
  
  var purge  = Utilities.formatDate(age, TIMEZONE, "yyyy-MM-dd");
  var avoid = " NOT label:" + DONE_LABEL[0];
  //var search = "(label:" + LABELS_TO_CONGRATULATE.join(" OR label:") + avoid +") after:" + purge; //Filtramos
  var search = "(label:" + LABELS_TO_CONGRATULATE.join(" OR label:") + ") after:" + purge + avoid; //Filtramos
  var threads = GmailApp.search(search, 0, PAGE_SIZE);
  Logger.log(search)
  Logger.log(threads)

}
function dailyCongratulations(){
  var age = new Date();  
  age.setDate(age.getDate() - 1); //Esto rula una vez al dia mas o menos, asi que solo queremos responder los correos con un dia de antiguedad    
  
  var purge  = Utilities.formatDate(age, TIMEZONE, "yyyy-MM-dd");
  var avoid = " NOT label:" + DONE_LABEL[0];
  var search = "(label:" + LABELS_TO_CONGRATULATE.join(" OR label:") + ") after:" + purge + avoid; //Filtramos
  try {
    var threads = GmailApp.search(search, 0, PAGE_SIZE);
    //var doneLabel=GmailApp.getUserLabelByName(DONE_LABEL[0]);
    var doneLabel=GmailApp.getUserLabelByName(DONE_LABEL[0]);
    for (var i=0; i<threads.length; i++) {
      threads[i].addLabel(doneLabel)
     
     
       var message=threads[i].getMessages()[0];
       //Logger.log(message.getBody());
       //if(true){
       if(message.isUnread()){
         message.markRead();
       
        var gif=getGIF();
        var string="My sweet Grandma, I wish you to be always happy and healthy as today! Happy birthday my beloved old woman!<-doesnt matter, it wont be shown"
        var options={htmlBody:`<!DOCTYPE html>
                    <html>
                    <head>
                      <link href='https://fonts.googleapis.com/css?family=Bangers|Sofia' rel='stylesheet'>
                      <meta name="viewport" container="width=device-width, initial-scale=1">
                      <style>
                        * {
                          transition: all 0.2s ease-in-out;
                          }
                        .title {
                          text-align: center;
                          font-family: 'Bangers';font-size: 22px;
                          color:#316879;
                        }
                        .title--modern{
                          font-family: Sofia;
                          text-align: center;
                          font-size: 13px;
                          font-weight: 400;
                          color: #f47a60;
                        }
                        .card {
                          margin: auto;
                          background: #7fe7dc;
                          border-radius: 8px;
                          height: auto;
                          width: 60vw;
                          /*box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
                          text-align: center;*/
                          display: flex;
                          flex-direction: row;
                          /*align: center;*/
                          padding: 1em;
                          overflow: hidden;
                            /*float: right;*/
                        }
                          img.gif-pic {
                          max-height: 40vh;
                          padding: 25px;
                          border-radius: 35px;
                          margin-top: auto;
                          margin-bottom: auto;
                        }
                        .text {
                          padding: 1em;
                        }
                        .muted {
                          opacity: 0.5;
                        }
                        .space {
                          height: 100px;
                        }
                        .container {
                          background: #316879;
                          margin: auto;
                          margin-right: 30px;
                          padding: 30px;
                          }
                        @media only screen and (max-width: 800px) {
                          .container {
                            background: #316879;
                            padding: 20px;
                            /*display: flex;*/
                            }
                          .card{
                            margin: auto;
                            height: auto;
                            width: auto;
                            display: table;
                            /*display: flex;
                            flex-direction: column;*/
                          
                          
                          }
                          img.gif-pic{
                            /*max-height:5vh;*/
                            margin-right: auto;
                            margin-left: auto;
                            margin-top: 20px;
                            align: top;
                            height: auto;
                            width:90%;
                            padding: 10px;
                            border-radius: 35px;
                            /*order: 1;*/
                            position: relative;
                          }
                          .text {
                            padding: 1em;
                            /*order: 2;*/
                            position: relative;
                            clear: both;
                          }
                          .title--modern{
                            font-family: Sofia;
                            text-align: center;
                            font-size: 10px;
                            font-weight: 400;
                            color: #1d3c45;
                          }
                          }
                        </style>
                    </head>
                    <body>
                      <div class='container'>
                        <div class='card'>
                          <div style="display: table-row;"><div style="display: table-cell;">
                          <img src=`+gif+` alt="birthday" class="gif-pic">
                          </div></div>
                          <div style="display: table-cell;">
                          <div class='text'>
                            <div class='title' align="top"><h1>Happy Birthday!</h1></div>
                              <p class='title--modern'>`+getMotivationalQuote().text+`</p>
                              <p class='muted' align="right"><i>`+getMotivationalQuote().author+`</i></p>
                              <p class='title--modern'>`+getShowerThought().title+`</p>
                              <p class='muted' align="right"><i>`+getShowerThought().author+`</i></p>
                              <p class='title--modern'>`+getBirthdayCongratulation()+`</p>
                              <p class='muted' align="right">Lukas Gdanietz</p>
                              </div></div>
                            <div class='space'></div>
                          </div>
                          </div>
                    </body>
                    </html>`
                    }
        message.replyAll(string, options);
       }

    }
  }
  catch (e){
    console.error("An error has ocurred: "+e)
  }

}
