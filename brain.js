class Brain{
    constructor(){
        this.teams = ['Lakers', 'Celtics', 'Golden State Warriors', 'Ducks'];
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
        this.twitter.twitterAjaxCall(team);
        this.google.getData(team);
        
    }

    renderAjaxCalls(){
        this.twitter = new Twitter('nba');
        if (this.twitter.afterLoad === false){
            this.twitter.twitterAjaxCall();
        } 
    
        setInterval(this.twitter.twitterAjaxCall, 5000000)
    
        this.google = new GoogleNews();
        this.google.getData();
    
        // youtube = new Youtube();
        // youtube.renderVideos();
    
    }

    renderBtn(){
        for (var value of this.teams){
            var listItem = $('<li>');
            var link = $('<a>').addClass('teams').text(value).click(this.userChoice);
            listItem.append(link);
            $('.dropdown-menu').append(listItem);
        }
        
    }
}