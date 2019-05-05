class Youtube {
    constructor () {
        this.getData = this.getData.bind(this);
        this.renderVideos = this.renderVideos.bind(this);
        this.videoSuccess = this.videoSuccess.bind(this);
        this.maxResults = 0;
        this.videoData = {};
    }

    // Youtube api
    getData (search) {
        debugger;
        var userSearch = search.split(' ').join('+');
        let ajaxOptions = {
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&relevaneLanguage=eng&maxResults=50&q='+userSearch+'&type=video&key=AIzaSyA5O8p3O4xkblZiUx9X0Kt-2HUKMdg802w',
            // url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&relevanceLanguage=eng&maxResults=50&q='+userSearch+'&type=video&key=AIzaSyC5VvBHUfI_GQ2QWcZzAnclQisziSaOMUk',
            method: 'get',
            dataType: 'json',
            success: this.videoSuccess.bind(this),
            error: function(){console.log('Error')} 
        }
        
        $.ajax(ajaxOptions);
        this.addMoreDataOnScroll();

    }

    // // Lfz youtube api backup
    // getData(search){
    // $.ajax({
    //     url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
    //     dataType: 'json',
    //     method: 'post',
    //     data: {
    //         q: search,
    //         maxResults: 50,
    //         type: 'video',
    //         detailLevel: 'verbose'
    //     },
    //     success: this.videoSuccess.bind(this),
    //     error: function(){console.log('Error');}
    //     })
    //     this.addMoreDataOnScroll();
    // }

    videoSuccess(response) {
        // youtube data
        this.videoData = response

        // // lfz youtube data backup
        // this.videoData = Object.values(response.data);

        
        this.renderVideos();
    }

    renderVideos () {
        var index = this.maxResults;
        if (this.maxResults > 47){
            return;
        } else {
            // // youtube data
            for (index; index < this.maxResults + 3; index++) {  //loops through video ID's, Images, and Titles of 10 Recent NBA highlights / youtube data
                let video =  '<iframe width="100%" height="300" src="https://www.youtube.com/embed/'+ this.videoData.items[index].id.videoId+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                let titleAttr = $('<div>').text(this.videoData.items[index].snippet.title);

            // // lfz youtube data backup
            // for (index; index < this.maxResults + 3; index++){
            //     let video =  '<iframe width="100%" height="300" src="https://www.youtube.com/embed/'+ this.videoData[index].id.videoId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            //     let titleAttr = $('<div>').text(this.videoData[index].snippet.title);

                
                $('.video').append(titleAttr, video);
            }
            this.maxResults += 3;
        }
    }

    handleInfiniteScroll(event) {
        if(event.target.scrollTop + event.target.offsetHeight > event.target.scrollHeight - 50) {
            this.renderVideos();
        }
    }

    addMoreDataOnScroll () {
        $(".video").scroll(this.handleInfiniteScroll.bind(this));
    }
}


