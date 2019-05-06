class Brain{
    constructor(){
        var twitter, google, youtube;
        this.twitter;
        this.google;
        this.youtube;
        this.ticketmaster;
        this.userChoice = this.userChoice.bind(this);
        this.eventUserChoice = this.eventUserChoice.bind(this);
        this.renderBtn = this.renderBtn.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.eventSearchItem = this.eventSearchItem.bind(this);
        this.teamClicked = 'news';

    }

    onStart(){
        this.renderAjaxCalls();
        this.ballsDontLie();
        this.clickHandler();
    }

    clickHandler(){
        $('button.search').on('click', this.searchItem )
        $('button.eventSearchBtn').on('click', this.eventSearchItem)
        debugger;
        $('.category').on('click', this.userChoice)
    }

    searchItem(){
        var searchRequest = $('input.searchInput').val();
        this.ajaxCall(searchRequest);
    }

    eventSearchItem(){
        debugger;
        var eventSearchRequest = $('#eventInput').val();
        this.ticketmaster.currentLocation(eventSearchRequest)
        
    }

    userChoice(){
        this.teamClicked = $(event.currentTarget).text();
        this.ajaxCall(this.teamClicked);
    }

    eventUserChoice(){
        this.teamClicked = $(event.currentTarget).text();
        this.ticketmaster.currentLocation(this.teamClicked);
    }

    

    ajaxCall( userSearch ){
        //google news
        $('.news-feed').empty();
        this.google.getData(userSearch);

        //twitter
        $('.twit').empty();
        this.twitter.twitterAjaxCall(userSearch);

        //youtube
        $('.video').empty();
        this.youtube.getData(userSearch);
        
    }

    renderAjaxCalls(){
        this.twitter = new Twitter();
        if (!this.twitter.onLoad){
            this.twitter.twitterAjaxCall(this.teamClicked)
        }

        setInterval( () => {
            this.twitter.twitterAjaxCall(this.teamClicked)
        }, 5000)

        this.google = new GoogleNews();
        this.google.getData('news');
    
        this.youtube = new Youtube();
        this.youtube.getData('news');
        
        this.ticketmaster = new Ticketmaster();
        this.ticketmaster.currentLocation('nba');
        

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
        debugger;
        var listItem = $('<li>').addClass('team');
        var link = $('<a>').text(team).on('click', this.userChoice);
        listItem.append(link);
        $('#index').append(listItem);

        var eventListItem = $('<li>').addClass('team')
        var eventLink = $('<a>').text(team).on('click', this.eventUserChoice);
        eventListItem.append(eventLink)
        $('#events').append(eventListItem);

    }



}