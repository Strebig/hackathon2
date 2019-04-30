class Youtube {
    constructor () {
        this.renderVideos = this.renderVideos.bind(this);
    }

renderVideos (){
    let ajaxOptions = {
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=nba&type=video&key=AIzaSyC5VvBHUfI_GQ2QWcZzAnclQisziSaOMUk',
        method: 'get',
        dataType: 'json',
        success: function(response){

            for (var i = 0; i < response.items.length; i++) {  //loops through video ID's, Images, and Titles of 10 Recent NBA highlights

                let video =  '<iframe width="280" height="157" src="https://www.youtube.com/embed/'+ response.items[i].id.videoId+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                let titleAttr = $('<div>').text(response.items[i].snippet.title);
                $('.video').append(titleAttr, video);

            }
        },
        error: function(){console.log('shit went south')}
    }
    
    $.ajax(ajaxOptions);

    }
}


