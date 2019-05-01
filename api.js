$(document).ready( startApp );


function startApp(){
    brain = new Brain();
    brain.renderBtn();
    brain.renderAjaxCalls();

    google = new GoogleNews();
    google.getData();

    youtube = new Youtube();
    youtube.renderVideos('nhl ducks');

    // ticketmaster = new Ticketmaster();
    // ticketmaster.getEventData();
    
}

