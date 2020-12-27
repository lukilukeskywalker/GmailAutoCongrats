# GmailAutoCongrats
Google script to auto congratulate your friends, so you don't have to!


<h1>So what is this?</h1>
It is just a simple script that gets trigered everyday and replies all messages inside a gmail label, in my case <it>Cumpleaños</it> (Birthday in spanish) creating a simple but fun HTML birthday card. This card contains a random gif from Giphy, a random motivational quote, a random shower thought from weeks top 100 posts in 
<a href="https://www.reddit.com/r/Showerthoughts/top/?t=week ">Reddit</a>
At the end it also includes a random Birtday Best Wishes quote extracted from a json file hosted in  <a href="https://github.com/itriplek/birthday-quotes-with-relationships/blob/master/birthday-quotes-with-relationship-formatted.json">Github</a>

<h1>How does it look?</h1>

<!DOCTYPE html>
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
                        color:#104C91;
                      }
                      .title--modern{
                        font-family: Sofia;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 400;
                        color: #1F8AC0;
                      }
                      .card {
                        margin: auto;
                        background: #EFC9AF;
                        border-radius: 8px;
                        height: auto;
                        width: 60vw;
                        /*box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
                        text-align: center;*/
                        /*display: flex;
                        flex-direction: row;*/
                        /*align: center;*/
                        padding: 1em;
                        overflow: hidden;
                        display: flex;
                        /*float: right;*/
                      }

                      img.gif-pic {
                        max-height: 40vh;
                        padding: 25px;
                        border-radius: 35px;
                      }

                      .text {
                        padding: 1em;
                        top: 10%;
                      }

                      .muted {
                        opacity: 0.5;
                      }

                      .space {
                        height: 100px;
                      }
                      .container {
                        background: #104C91;
                        margin: auto;
                        margin-right: 30px;
                        padding: 30px;
                      }
                      @media only screen and (max-width: 800px) {
                        .container {
                          background: #104C91;
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
                        }
                        .title--modern{
                          font-family: Sofia;
                          text-align: center;
                          font-size: 10px;
                          font-weight: 400;
                          color: #1F8AC0;
                        }
                        
                      }

                    </style>
                  </head>
                  <body>
                    <div class='container'>
                      <div class='card'>
                        
                   
                          <div style="display: table-row;">
                            <div style="display: table-cell; border-style: dotted;">
                              <img src="https://media.giphy.com/media/26FPpSuhgHvYo9Kyk/giphy.gif" alt="birthday" class="gif-pic">
                            </div>
                            </div>
                            <div style="display: table-cell; border-style: dotted;">
                              <div class='text'>
                                <div class='title' align="top"><h1>Happy Birthday!</h1></div>
                                  <p class='title--modern'>`+getMotivationalQuote().text+`</p>
                                  <p class='muted' align="right"><i>`+getMotivationalQuote().author+`</i></p>
                                    <p class='title--modern'>`+getShowerThought().title+`</p>
                                    <p class='muted' align="right"><i>`+getShowerThought().author+`</i></p>
                                      <p class='title--modern'>`+getBirthdayCongratulation()+`</p>
                                      <p class='muted' align="right">Lukas Gdanietz</p>
                                      </div>
                                      </div>
                          <div class='space'></div>
                        </div>
                       </div>
                  </body>
                  </html>

