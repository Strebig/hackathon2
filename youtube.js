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
                let video = 'https://www.youtube.com/watch?v='+response.items[i].id.videoId;
                let imgAttr = $('<img>').attr('src', response.items[i].snippet.thumbnails.default.url);
                let link = $('<a>').attr('href', video);
                let titleAttr = link.text(response.items[i].snippet.title); 
                link.append(imgAttr);
                link.append(titleAttr);
                $('body').append(link);
                $('body').append(titleAttr);
            }
        },
        error: function(){console.log('shit went south')}
    }
    
    $.ajax(ajaxOptions);

    }
}


