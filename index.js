var i, city;
var listings = [];
var airbnbOnly = [];

function getData () {
  city = "san%20francisco";
  // startDate
  // endDate

  $.ajax({
    type: "GET",
    url: "http://api.outpost.travel/placeRentals/?city=" + city,
  }).done(function(data){
    listings = data._items;
    // go thru all the pages, put all the listings in the listings array.

    for ( i = 0; i < listings.length; i++ ) {
      if (listings[i].fullProvider == "Airbnb") {
        // put all airbnb in airbnbOnly array
        // start date? end date?

        // for each listing, check the airbnb page itself for...
        // "Minimum stay is 2 nights"
        // "Those dates are not available"
        // if includes, SKIP

        // an array for all the listings with that availability
      };
    }

    debugger
  });
}

$(document).ready(function(){
  getData();
});