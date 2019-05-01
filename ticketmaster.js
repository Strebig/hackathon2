$(document).ready(function(){


})


class Ticketmaster {
    constructor(events) {
        this.events = events;
        
        this.getEventData = this.getEventData.bind(this);
    }


}
function getEventData() {
    console.log('getting data');

    events = this.events;
    var ajaxConfig = {
        dataType: "json",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=H0mGFbjb56iABO6ObBkeRcJshhHZCAek&keyword=NBA&maxResult=5&priceRanges=USD&dates=localDate",
        method: "get",
        success: function(response){
            console.log("Events: ", response);
           
                for(var i=0; i < response._embedded.events.length; i++){
                    console.log(response._embedded.events.length);
                    var container = $("<div>",{
                        class: 'event_container' 
                    });
                    var name = $("<div>").text(response._embedded.events[i].name);
                    console.log("name", name);
                    var dates = $("dates").text(response._embedded.events[i].dates);
                    console.log("dates", dates);
                    var priceRanges = $("priceRanges").text(response._embedded.events[i].priceRanges);
                    console.log("priceRanges", priceRanges);
                }
        
            
            

        },
    };
    $.ajax(ajaxConfig);
}
