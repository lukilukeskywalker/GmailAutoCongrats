# GmailAutoCongrats
Google script to auto congratulate your friends, so you don't have to!


<h1>So what is this?</h1>
It is just a simple script that gets trigered everyday and replies all messages inside a gmail label, in my case <it>Cumpleaños</it> (Birthday in spanish) creating a simple but fun HTML birthday card. This card contains a random gif from Giphy, a random motivational quote, a random shower thought from weeks top 100 posts in 
<a href="https://www.reddit.com/r/Showerthoughts/top/?t=week ">Reddit</a>
At the end it also includes a random Birtday Best Wishes quote extracted from a json file hosted in  <a href="https://github.com/itriplek/birthday-quotes-with-relationships/blob/master/birthday-quotes-with-relationship-formatted.json">Github</a>

<h1>How does it look?</h1>

<img src="https://github.com/lukilukeskywalker/GmailAutoCongrats/blob/main/pickachubirthday.png">


<h1>How does it work?</h1>
First it creates a daily schedule on Google Scripts. Then everyday, the script makes a request to he google API requesting Threads that contain the label [Birthday], that are younger than 1 day and that do not contain another label named [Birtday-Done]. The request then returns a number of threads that the script will process. 
