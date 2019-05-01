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
<<<<<<< HEAD
            debugger;
=======
            console.log('ran');
>>>>>>> d6adefa9a8a6e2f386f2bc9499e07fc27ca010ee
            var tweets = response.tweets.statuses;
            if (!this.onLoad){
                for (var i = 0; i < 3; i++){
                    var userId = tweets[i].id
                    this.id.push(userId);
                    var userName = $('<div class="username">').text(`-${tweets[i].user['screen_name']}`);
                    var tweetContainer = $('<div class="twitterContainer">')
                    var tweet = $('<div class="tweet">').text(tweets[i].text);
                    tweetContainer.append(tweet, userName);
                    $('.twit').prepend(tweetContainer)
                    this.onLoad = true;
                    }     
                } else {
                debugger;
                for (var key in tweets){
                    var userId = tweets[key].id
                    var lastTweet = $('.twitterContainer:nth-last-child(1)')
                    if (this.checkIdExists(userId , this.id)){
                        $('.twitterContainer:nth-last-child(1)').fadeOut(300, function(){
                            $('.twitterContainer:nth-last-child(1)').remove()
                        });
                        this.id.push(userId);
                        var userName = $('<div class="username">').text(`-${tweets[key].user['screen_name']}`);
                        var tweetContainer = $('<div class="twitterContainer">')
                        var tweet = $('<div class="tweet">').text(tweets[key].text);
                        tweetContainer.append(tweet, userName);
                        // tweetContainer.fadeIn(300, function(){ $('.twit').prepend(tweetContainer)});
                        $('.twit').prepend(tweetContainer).fadeIn(400);
                        return;
                    }     
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