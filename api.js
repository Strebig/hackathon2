$(document).ready( startApp );

var twitter, google, youtube;

function startApp(){
    twitter = new Twitter('nba');
    if (twitter.afterLoad === false){
        twitter.twitterAjaxCall();
    } 
    setInterval(twitter.twitterAjaxCall, 5000000)

    google = new GoogleNews();
    google.getData();

    youtube = new Youtube();
    youtube.renderVideos('nhl ducks');
    
}

