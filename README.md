# GmailAutoCongrats
Google script to auto congratulate your friends, so you don't have to!


<h1>So what is this?</h1>
It is just a simple script that gets trigered everyday and replies all messages inside a gmail label, in my case <it>Cumpleaños</it> (Birthday in spanish) creating a simple but fun HTML birthday card. This card contains a random gif from Giphy, a random motivational quote, a random shower thought from weeks top 100 posts in 
<a href="https://www.reddit.com/r/Showerthoughts/top/?t=week ">Reddit</a>
At the end it also includes a random Birthday Best Wishes quote extracted from a json file hosted in  <a href="https://github.com/itriplek/birthday-quotes-with-relationships/blob/master/birthday-quotes-with-relationship-formatted.json">Github</a>

<h1>How does it look?</h1>

<img src="https://github.com/lukilukeskywalker/GmailAutoCongrats/blob/main/pickachubirthday.png">


<h1>How does it work?</h1>
First it creates a daily schedule on Google Scripts. Then everyday, the script makes a request to the Gmail API requesting Threads that contain the label [Birthday], that are younger than 1 day and that do not contain another label named [Birthday-Done]. The request then returns a number of threads that the script will process. <p></p>
The first process per thread is to see if the first message (message[0]) has been read, if it was read, then it just ignores the thread and sets the label Birthday-Done] on the thread. It seems that setting this label to the thread does not mean that all incoming messages of that thread will have that label. That is why we check if the first messsage was read. Because if it was read, it means that or the program did already take care of it, or that the user did read it, and probably reply to the message. The next step is obviously create the body of the message. The body is made with css and html. It seems that some newer css technologies are not implemented in email, so for example the message does not use flexbox for dinamically ordering the two divs, it uses tables.
<p></p>Once the body of the email is done, it just executes "message.replyAll()" sending the message to everyone in the group



<h1>Set up</h1>
First copy the gs file into your Google script dashboard, then set the API key for Giphy, create the corresponding labels in your gmail and set a filter in gmail that sets the label for birthday to any incoming mails that contain any key words (like, "Birthday"...) Also create a Done label inside the "birthday" label.
<p></p> Next step is setting those parameters in your script, the first parameter, the LABELS_TO_CONGRATULATE parameter, must be set as it appears on the search prompt when you click on the "birthday" label. The second parameter ,DONE_LABEL, must be written like in a folder system
<p></p>Now save it, and go to "run" on google scrips, and run install. This will create a daily trigger that executes dailyCongratulations() 

<p></p> To test it out you can send yourself an email with the birthday keyword that will end on the filtered label "birthday label" and then run dailyCongratulations() manually.

<h1>What else can be done</h1>

Well I guess we could connect the app with my calendar and make it congrat someone if it is someones birthday. But first, I usually don't save my friends birthday on my calendar, and secondly, for those I do save his birthday, I like to make something special (or at least I try)
<p></p>I could also make it "special" with a script, but I don't trust for example the Google Photos filtering and grouping algorithm. I mean... It looks nice, but some pics are private, and I wouldn't trust a script or program to distinguish from private pics to public pics

<h1>Disclaimer</h1>
Ok, maybe the code isn't the cleanest... Some Ideas I had is that on Install I could create those labels on gmail, so the user, you and me, don't need to set those predefined variables. Just because of that, it will probably not work. <p></p>Just because, in reality the DONE_LABEL needs to be written in two forms. One by how it will be searched by "GmailApp.search" and one by how "GmailApp.getUserLabelByName" needs to get the label. I guess I could get rid of the Done mechanism, as it isn't necesary and does not really work, it just makes the request shorter to process. 
