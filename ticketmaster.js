class Ticketmaster {
    constructor(events) {
        this.events = events;
        // this.getEventData = this.getEventData.bind(this);
        this.onLoad = false;
        this.currentLocation = this.currentLocation.bind(this);

    }
    renderEvent( team , latlong) {
        var teamName = team.split(' ').join('+');
        $('.events').empty();

        var onLoadAjaxConfig = {
            dataType: "json",
            url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=wsAc3rLVG2FAtb1aaUPnSMdXmNgKgAEd&latlong=${latlong}&priceRanges=USD&startDateTime&id`,
            // url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=wsAc3rLVG2FAtb1aaUPnSMdXmNgKgAEd&keyword=${teamName}&priceRanges=USD&startDateTime&id`,
            // url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=H0mGFbjb56iABO6ObBkeRcJshhHZCAek&keyword=basketball&priceRanges=USD&startDateTime&id",
            method: "get",
            success: renderEvents.bind(this)
        };

        var afterLoadAjaxConfig = {
            dataType: "json",
            // url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=wsAc3rLVG2FAtb1aaUPnSMdXmNgKgAEd&latlong=${latlong}&priceRanges=USD&startDateTime&id`,
            url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=wsAc3rLVG2FAtb1aaUPnSMdXmNgKgAEd&keyword=${teamName}&priceRanges=USD&startDateTime&id`,
            // url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=H0mGFbjb56iABO6ObBkeRcJshhHZCAek&keyword=basketball&priceRanges=USD&startDateTime&id",
            method: "get",
            success: renderEvents.bind(this)
        }

        function renderEvents(response){
            var container = container;
            for(var i=0; i < response._embedded.events.length; i++){
                container = $("<div>",{
                    class: 'event_container' 
                });
                var name = $("<li>").text(response._embedded.events[i].name);
                var dates = $('dates').addClass("Dates: ").text(response._embedded.events[i].dates);
                var priceRanges = $("priceRanges").text(response._embedded.events[i].priceRanges);
                var tickets = response._embedded.events[i].url;
                var button = $('<a target="_blank">').attr("href", tickets );
                var getSeats = $('<button class="getSeats">').text("Find Tickets");
                $('body').append(container);
                button.append(getSeats);
                $('.events').append(name, button);
                this.onLoad = true;
                
            };
        }

        if (!this.onLoad){
            $.ajax(onLoadAjaxConfig);
        } else {
            $.ajax(afterLoadAjaxConfig);
        }
        
    }
    
    currentLocation( team ) {
        var team = team
        $.ajax({
            url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDMoJiBDxdSzHNulmyQTcwhvN7XUErfXBo',
            method: 'post',
            dataType: 'json',
            success: onSuccess.bind(this)
        });

        function onSuccess(response){
            console.log(response);
            var latlong = response.location.lat + ',' + response.location.lng;
            this.renderEvent( team , latlong)
        }
    }


}

