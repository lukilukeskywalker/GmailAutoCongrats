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
<p></p>Once the body of the email is done, it just executes '''"message.replyAll()"''' sending the message to everyone in the group



<h1>Set up</h1>
