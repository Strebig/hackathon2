

class GoogleNews {
    constructor() {
    this.getData = this.getData.bind(this);
    this.newsArticle = this.newsArticle.bind(this);
    }

    getData(param) {
        $.ajax({
            url: 'https://newsapi.org/v2/everything?apiKey=4875328af25d48efad522d7dee93b271&q='+param,
            method: 'get',
            dataType: 'json',
            success: this.newsArticle.bind(this)
        });

    }
    newsArticle(response) {
        for (var index = 0; index < response.articles.length; index++){ //response.articles.length
            let title = response.articles[index].title;
            let imgLink = response.articles[index].urlToImage;
            let imgInfo = $('<img>').attr('src', imgLink);
            let link = response.articles[index].url;

            let container = $('<div>');
            let atag = $('<a>').attr('href', link).attr('target', '_blank');
            let text = $('<div>').text(response.articles[index].title);
            let linkedtext = $(atag).append(text);
            $(container).append(imgInfo).append(linkedtext);
            $('.news-feed').append(container);
        }

    }
    

}

