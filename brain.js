class Brain{
    constructor(){
        this.teams = ['Lakers', 'Celtics', 'Golden State Warriors'];
        var twitter, google, youtube, brain;
        this.twitter;
        this.google;
        this.youtube;
        this.userChoice = this.userChoice.bind(this)
    }

    userChoice(){
        console.log(event.currentTarget);
        var userChoice = $(event.currentTarget).text();
        this.ajaxCall(userChoice);
    }

    ajaxCall( team ){
        $('.news-feed').empty();
        $('.twit').empty();
        $('.video').empty();
        this.twitter.twitterAjaxCall(team);
        this.google.getData(team);
        this.youtube.renderVideos(team);
        
    }

    renderAjaxCalls(){
        this.twitter = new Twitter('nba');
        if (this.twitter.afterLoad === false){
            this.twitter.twitterAjaxCall();
        } 
    
        setInterval(this.twitter.twitterAjaxCall, 5000000)
    
        this.google = new GoogleNews();
        this.google.getData('nba');
    
        this.youtube = new Youtube();
        this.youtube.renderVideos('nba');
    
    }

    renderBtn(){
        debugger;
        for (var value of this.teams){
            var button = $('<button>').addClass('teams').text(value).click(this.userChoice);
            $('.navbar').append(button);
        }
        
    }
}