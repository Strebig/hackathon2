class Brain{
    constructor(){
        this.teams = ['Lakers', 'Celtics', 'Golden State Warriors'];
        var twitter, google, youtube;
        this.twitter;
        this.google;
        this.youtube;
        this.ticketmaster;
        this.userChoice = this.userChoice.bind(this);
        this.renderBtn = this.renderBtn.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.teamClicked = 'nba';

    }

    onStart(){
        this.renderAjaxCalls();
        this.ballsDontLie();
        this.clickHandler();
    }

    clickHandler(){
        $('button.search').on('click', this.searchItem )
    }

    searchItem(){
        var searchRequest = $('input.searchInput').val();
        this.ajaxCall(searchRequest);
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
        if (!this.twitter.onLoad){
            this.twitter.twitterAjaxCall(this.teamClicked)
<<<<<<< HEAD
        }

        setInterval( () => {
            this.twitter.twitterAjaxCall(this.teamClicked)
        }, 10000)

        
=======
        }.bind(this), 5000)
    
>>>>>>> a649980a947c9db6208f97c894e41dfe4f78fc44
        this.google = new GoogleNews();
        this.google.getData('nba');
    
        this.youtube = new Youtube();
        this.youtube.getData('nba');
        

    }

    ballsDontLie(){
        var teams = {
            dataType: 'json',
            method: 'get',
            url: "https://www.balldontlie.io/api/v1/teams",
            success: renderTeamName.bind(this)
        }

        function renderTeamName(response){
            for (var value of response.data){
                var teamName = value.full_name;
                this.renderBtn(teamName);
            }
        }
    
        $.ajax(teams)
    }

    renderBtn( team ){
        var listItem = $('<li>');
        var link = $('<a>').text(team).click(this.userChoice);
        listItem.append(link);
        $('.dropdown-menu').append(listItem);
    }



}