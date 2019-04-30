$(document).ready( startApp );

var twitter;

function startApp(){
    twitter = new Twitter('nba');
    if (twitter.afterLoad === false){
        twitter.twitterAjaxCall();
    } 
    setInterval(twitter.twitterAjaxCall, 5000)
    var gn = new GoogleNews();
    gn.getData();
    
}

