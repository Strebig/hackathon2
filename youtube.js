class Youtube {
    constructor () {
        this.getData = this.getData.bind(this);
        this.renderVideos = this.renderVideos.bind(this);
        this.maxResults = 0;
        this.videoData;
    }

    // function learningFuzeYtAPI(){
    //     $.ajax({
    //         url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
    //         dataType: 'json',
    //         method: 'post',
    //         data: {
    //             q: 'nba',
    //             maxResults: 5,
    //             type: 'video',
    //             detailLevel: 'verbose'
    //         },
    //         success: function(response){
    //             console.log(response);
    //             vidRender(response.video)
    //         }
    //     })

    getData (search) {
        let ajaxOptions = {
            // url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=51&q='+search+'&type=video&key=AIzaSyA5O8p3O4xkblZiUx9X0Kt-2HUKMdg802w',
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q='+search+'&type=video&key=AIzaSyC5VvBHUfI_GQ2QWcZzAnclQisziSaOMUk',
            method: 'get',
            dataType: 'json',
            success: this.videoSuccess.bind(this),
            error: function(){console.log('Error')} 
        }
        
        $.ajax(ajaxOptions);
        this.addMoreDataOnScroll();

    }

    videoSuccess(response) {
        this.videoData = response;
        this.renderVideos();
    }

    renderVideos () {
        debugger;
        var index = this.maxResults;
        console.log(index)
        if (this.maxResults > 47){
            return;
        } else {
            for (index; index < this.maxResults + 3; index++) {  //loops through video ID's, Images, and Titles of 10 Recent NBA highlights
                let video =  '<iframe width="100%" height="300" src="https://www.youtube.com/embed/'+ this.videoData.items[index].id.videoId+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                let titleAttr = $('<div>').text(this.videoData.items[index].snippet.title);
                $('.video').append(titleAttr, video);
                
            }
            this.maxResults += 3;
        }
        
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


