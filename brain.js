class Brain{
    constructor(){
        this.teams = ['Lakers', 'Celtics', 'Golden State Warriors'];
        var twitter, google, youtube;
        this.twitter;
        this.google;
        this.youtube;
        this.userChoice = this.userChoice.bind(this);
        this.renderBtn = this.renderBtn.bind(this);
        this.teamClicked = 'nba';

    }

    userChoice(){
        this.teamClicked = $(event.currentTarget).text();
        this.ajaxCall(this.teamClicked);
    }

    ajaxCall( team ){
        //google news
        $('.news-feed').empty();
        this.google.getData(team);

        //twitter
        $('.twit').empty();
        this.twitter.twitterAjaxCall(team);

        //youtube
        $('.video').empty();
        this.youtube.getData(team);
        
    }

    renderAjaxCalls(){
        this.twitter = new Twitter();
    
        setInterval( () => {
            this.twitter.twitterAjaxCall(this.teamClicked)
        }, 5000000)


        this.google = new GoogleNews();
        this.google.getData('nba');
    
        this.youtube = new Youtube();
        this.youtube.getData('nba');
        
    }

    renderBtn( team ){

        var listItem = $('<li>');
        var link = $('<a>').addClass('teams').text(team).click(this.userChoice);
        listItem.append(link);
        $('.dropdown-menu').append(listItem);
    }

    ballsDontLie(){
        var teams = {
            dataType: 'json',
            method: 'get',
            url: "https://www.balldontlie.io/api/v1/teams",
            success: renderTeamName.bind(this)
        }

        function renderTeamName(response){
            console.log(response.data);
            for (var value of response.data){
                var teamName = value.full_name;
                this.renderBtn(teamName);
            }
        }
    
        $.ajax(teams)
    }


}