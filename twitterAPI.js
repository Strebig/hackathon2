class Twitter{
    constructor(){
        this.twitterAjaxCall = this.twitterAjaxCall.bind(this)
        this.id = [];
        this.onLoad = false;
        this.checkIdExists = this.checkIdExists.bind(this)
    }

    twitterAjaxCall(team){
        
        var twitterAjax = {
            url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
            dataType: 'json',
            data:{
                search_term: team
            },
            success: twitterSuccess.bind(this),
            error: function(response){
                console.log(response);
            }
        }

        function twitterSuccess(response){
            debugger;
            console.log('ran');
            var tweets = response.tweets.statuses;
            if (!this.onLoad){
                for (var key in tweets){
                    var userId = tweets[key].id
                    this.id.push(userId);
                    var userName = $('<div class="username">').text(`-${tweets[key].user['screen_name']}`);
                    var tweetContainer = $('<div class="twitterContainer">')
                    var tweet = $('<div class="tweet">').text(tweets[key].text);
                    tweetContainer.append(tweet, userName);
                    $('.twit').prepend(tweetContainer)
                    this.onLoad = true;
                    }     
                } else {
                debugger;
                for (var key in tweets){
                    var userId = tweets[key].id
                    if (this.checkIdExists(userId , this.id)){
                        this.id.push(userId);
                        var userName = $('<div class="username">').text(`-${tweets[key].user['screen_name']}`);
                        var tweetContainer = $('<div class="twitterContainer">')
                        var tweet = $('<div class="tweet">').text(tweets[key].text);
                        tweetContainer.append(tweet, userName);
                        $('.twit').prepend(tweetContainer)
                        return;
                    }     
                    return;
                } 
            }
        }

        $.ajax(twitterAjax);
    }

    checkIdExists(newId, currentIdArray){
        if (currentIdArray.includes(newId)){
            return false;
        } 
        return true;
    }


}