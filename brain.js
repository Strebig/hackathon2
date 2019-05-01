class Brain{
    constructor(){
        this.teams = ['Lakers', 'Celtics', 'Golden State Warriors'];
        var twitter, google, youtube, brain;
        this.twitter;
        this.google;
        this.youtube;
        this.ticketmaster;
        this.userChoice = this.userChoice.bind(this);
        this.teamClicked = 'nba';
    }

    userChoice(){
        console.log(event.currentTarget);
        this.teamClicked = $(event.currentTarget).text();
        this.ajaxCall(this.teamClicked);
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
        this.twitter = new Twitter();
        if (this.twitter.afterLoad === false){
            this.twitter.twitterAjaxCall('nba');
        } 
    
        setInterval(function(){
            this.twitter.twitterAjaxCall(this.teamClicked)
        }.bind(this), 5000)
    
        this.google = new GoogleNews();
        this.google.getData('nba');
    
        this.youtube = new Youtube();
        this.youtube.renderVideos('nba');
        

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