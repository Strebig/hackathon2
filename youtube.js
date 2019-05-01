class Youtube {
    constructor () {
        this.getData = this.getData.bind(this);
        this.renderVideos = this.renderVideos.bind(this);
        this.maxResults = 0;
        this.videoData;
    }

    getData (search) {
        let ajaxOptions = {
            // url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q='+search+'&type=video&key=AIzaSyA5O8p3O4xkblZiUx9X0Kt-2HUKMdg802w',
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q='+search+'&type=video&key=AIzaSyC5VvBHUfI_GQ2QWcZzAnclQisziSaOMUk',
            method: 'get',
            dataType: 'json',
            success: this.videoSuccess.bind(this),

            error: function(){console.log('shit went south')}
            
        }
        
        $.ajax(ajaxOptions);
        this.addMoreDataOnScroll();

    }

    videoSuccess(response) {
        this.videoData = response;
        this.renderVideos();
    }

    renderVideos () {
        var index = this.maxResults;

        for (index; index < this.maxResults + 3; index++) {  //loops through video ID's, Images, and Titles of 10 Recent NBA highlights
            let video =  '<iframe width="100%" height="300" src="https://www.youtube.com/embed/'+ this.videoData.items[index].id.videoId+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            let titleAttr = $('<div>').text(this.videoData.items[index].snippet.title);
            $('.video').append(titleAttr, video);
        }
        this.maxResults = this.maxResults + 3;
    }

    handleInfiniteScroll(event) {
        // console.log(event)
        // console.log("Scroll Top Value", event.target.scrollTop);
        // console.log("Scroll Height Value ", event.target.scrollHeight);
        // console.log("Offset Top Height ", event.target.offsetHeight);
        if(event.target.scrollTop + event.target.offsetHeight > event.target.scrollHeight - 50) {
            this.renderVideos();
        }
    }

    addMoreDataOnScroll () {
        $(".video").scroll(this.handleInfiniteScroll.bind(this));
    }
}


