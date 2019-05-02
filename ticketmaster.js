// $(document).ready(function(){


// })


class Ticketmaster {
    constructor(events) {
        this.events = events;
        
        this.getEventData = this.getEventData.bind(this);
    }
    getEventData( team ) {
        // console.log('getting data');
        var teamName = team.split(' ').join('+');
        $('.events').empty();
        var ajaxConfig = {
            dataType: "json",
            url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=wsAc3rLVG2FAtb1aaUPnSMdXmNgKgAEd&keyword=${teamName}&priceRanges=USD&startDateTime&id`,
            // url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=H0mGFbjb56iABO6ObBkeRcJshhHZCAek&keyword=basketball&priceRanges=USD&startDateTime&id",
            method: "get",
            success: function(response){
                // console.log("Events: ", response);
                    var container = container;
                    for(var i=0; i < response._embedded.events.length; i++){
                        // console.log(response._embedded.events.length);
                        container = $("<div>",{
                            class: 'event_container' 
                        });
                        var name = $("<li>").text(response._embedded.events[i].name);
                        // console.log("name", name);
                        var dates = $('dates').addClass("Dates: ").text(response._embedded.events[i].dates);
                        // console.log(response._embedded.events[i].dates);
                        var priceRanges = $("priceRanges").text(response._embedded.events[i].priceRanges);
                        // console.log("priceRanges", priceRanges);
                        var tickets = response._embedded.events[i].url;
                        var button = $('<a target="_blank">').attr("href", tickets );
                        var getSeats = $('<button class="getSeats">').text("Find Tickets");
                        // console.log(game);
                        // console.log('getSeats', getSeats);
                        $('body').append(container);
                        button.append(getSeats);
                        $('.events').append(name, button);
                        
                    };
            },
        }
        $.ajax(ajaxConfig);
    }

}

