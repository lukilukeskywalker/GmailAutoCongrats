

var TRIGGER_NAME = "dailyCongratulations"
var SUBJECT_TRIGGER = "[Cumpleaños]"
//var LABELS_TO_CONGRATULATE = ["best-lbg-madrid-cumpleaños"]
var CONGRAT_LABEL = ["BIRTHDAY_LABEL"] //for example: ["BEST/LBG Madrid/Cumpleaños"]
//var DONE_LABEL = ["best-lbg-madrid-cumpleaños-done"]
var PAGE_SIZE = 150;
var TIMEZONE = "AEST";
var GIPHY_API_KEY="GIPHY_API_KEY";


function Install() {
  createEndPoint();
  // First run 2 mins after install
  ScriptApp.newTrigger(TRIGGER_NAME)
           .timeBased()
           .at(new Date((new Date()).getTime() + 1000*60*2))
           .create();
  
  // Run daily there after
  ScriptApp.newTrigger(TRIGGER_NAME)
           .timeBased().everyDays(1).create();

}
function createEndPoint() {

  var name   = CONGRAT_LABEL[0];
  var labels = name.split("/");
  labels.push("Done");
  var gmail, label = "";

  for (var i=0; i<labels.length; i++) {
    //var existingLabel=GmailApp.getUserLabelByName(label + ((i===0) ? "" : "/") + labels[i]);
    //Looks if the label already exists. If it does, it doesnt recreate it
    
    //& existingLabel==null
    if (labels[i] !== "" ) {
      label = label + ((i===0) ? "" : "/") + labels[i];
      gmail = GmailApp.getUserLabelByName(label) ?
                  GmailApp.getUserLabelByName(label) : GmailApp.createLabel(label);
    }
   
    

  }
  var filter = Gmail.newFilter();
  filter.criteria = Gmail.newFilterCriteria();
  filter.criteria.subject = SUBJECT_TRIGGER;
  filter.action = Gmail.newFilterAction();
  filter.action.removeLabelIds = ['INBOX'];
  //var congrat_label=(GmailApp.getUserLabelByName(CONGRAT_LABEL[0]));
  //Logger.log(Object.keys(congrat_label));
  //Logger.log(Object.getOwnPropertyNames(congrat_label))
  var request = Gmail.Users.Labels.list('me').labels;
  //Logger.log(request.find(name = CONGRAT_LABEL[0]))
  Logger.log(request.find(searchCongratLabel));
  //Logger.log(congrat_label['id'])
  filter.action.addLabelIds = request.find(searchCongratLabel).id;
  var me = Session.getEffectiveUser().getEmail();
  Gmail.Users.Settings.Filters.create(filter, me)

  return gmail;

}
function searchCongratLabel(request){
  return request.name === CONGRAT_LABEL[0];
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
Logger.log(gifURL);
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
function threadsToCongrat(){
  var label = GmailApp.getUserLabelByName(CONGRAT_LABEL[0])
  var doneLabel = GmailApp.getUserLabelByName(CONGRAT_LABEL[0]+"/Done") //CONGRAT_LABEL[0].join("/Done"))
  var threads = label.getThreads();
  var doneThreads = doneLabel.getThreads();
  var age = new Date();
  age.setDate(age.getDate() - 1);
  for(var j=threads.length-1; j>-1;j--){
    for(var i=0; i<doneThreads.length; i++){
      if(threads[j].getMessages()[0].getDate()<age){
        threads.splice(j, 1);
        break;
      }
      else if(threads[j].getId()===doneThreads[i].getId()){
        threads.splice(j, 1);
      }
    }
    
  }

  /*for (var i=0; i<threads.length; i++){
    var labels=threads[i].getLabels()
    Logger.log(threads[i].getFirstMessageSubject())
    for (var j=0; j<labels.length; j++){
      Logger.log(labels[j].getName())
    }
    if(labels.includes(doneLabel)){
      Logger.log("Fail")
      Logger.log(threads[i].getFirstMessageSubject())
    }
    
  }*/
  return threads;
}
function congratulateFriend(){
  var gif = 'https://media.giphy.com/media/ToMjGpM3hk5UL5UMQ4o/giphy.gif';//'https://media.giphy.com/media/mcJohbfGPATW8/giphy.gif';

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
        .space {
          height: 0px;
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
             A Dhiraj Tejuani
            </div></div>
           <div style="display: table-cell;">
            <div class='text'>
              <div class='title' align="top"><h1>Happy Birthday!</h1></div>
               <p class='title--modern'>A la mejor parte del topic responsible del hackathon</p>
               <p class='muted' align="right">"BEST Madrid"</p>
               <p class='title--modern'>"Hay que fabricar Dhirajs que nos permitan seguir fabricando máquinas, porque lo que no va a hacer nunca la máquina es fabricar máquinas"</p>
               <p class='muted' align="right">Mariano Rajoy</p>
               <p class='title--modern'>P.s: <i>"Que no voy a dejar que el bot se ocupe de esto? Que no? Ya veras tu que si..."</i></p>
               <p class='muted' align="right">Lukas Gdanietz</p>
              </div></div>
            </div>
          </div>
      
      </body>
      </html>`
  }
  try{
    MailApp.sendEmail('lukasgdanietz@gmail.com', '[Cumpleaños] ', 'Pues eso... que cumple 24 añazos', options)
  }
  catch (e){
    console.error("An error has ocurred: "+e)
  }

}
function dailyCongratulations(){
  /*var age = new Date();  
  age.setDate(age.getDate() - 1); //Esto rula una vez al dia mas o menos, asi que solo queremos responder los correos con un dia de antiguedad    
  
  var purge  = Utilities.formatDate(age, TIMEZONE, "yyyy-MM-dd");
  var avoid = " NOT label:" + DONE_LABEL[0];
  var search = "(label:" + LABELS_TO_CONGRATULATE.join(" OR label:") + ") after:" + purge + avoid; //Filtramos*/
  
  try {
    //var threads = GmailApp.search(search, 0, PAGE_SIZE);
    var threads=threadsToCongrat();
    //var doneLabel=GmailApp.getUserLabelByName(DONE_LABEL[0]);
    //var doneLabel=GmailApp.getUserLabelByName("BEST/LBG Madrid/Cumpleaños/Done");
    var doneLabel=GmailApp.getUserLabelByName(CONGRAT_LABEL[0]+"/Done");
    for (var i=0; i<threads.length; i++) {
      //var message= new GmailMessage();
      //var labels=threads[i].getLabels();
      //if(!labels.includes("label:best-lbg-madrid-cumpleaños-done ")){
      /*if(!doneThreads.includes(threads[i])){
        for(var j=0; j<labels.length; j++){
          Logger.log(labels[j].getName())
        }
        threads[i].addLabel(doneLabel)
      }*/
      threads[i].addLabel(doneLabel)
     
     
       var message=threads[i].getMessages()[0];
       //Logger.log(message.getBody());
       //if(true){
       if(message.isUnread()){  //I should put this check, inside of threadsToCongrat()
         message.markRead();
       
        var gif=getGIF();
        var string="My sweet Grandma, I wish you to be always happy and healthy as today! Happy birthday my beloved old woman!"
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
