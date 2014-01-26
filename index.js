var city,
    lastPageHref,
    nextPageHref,
    totalPagesNum,
    nextPageNum,
    i;

var listings = [];
var airbnbListings = [];

function getNextListings () {
  $.ajax({
    type: "GET",
    url: "http://api.outpost.travel/placeRentals/?city=" + city + "&sortMethod=1&page=" + nextPageNum.toString(),
  }).done(function(data){
    nextPageHref = data._links.next.href;
    nextPageNum = Math.floor(nextPageHref.split("&page=")[1]);

    for ( i = 0; i < data._items.length; i++ ) {
      listings.push(data._items[i]);
    };
  });

  if ( nextPageNum <= totalPagesNum ) {
    getNextListings();
  } else {
    for ( i = 0; i < listings.length; i++ ) {
      if (listings[i].fullProvider == "Airbnb") {
        // puts only airbnb listings in an array
        airbnbListings.push(listings[i]);
        return airbnbListings;

        // start date? end date?
        // for each listing, check the airbnb page itself for...
        // "Minimum stay is 2 nights"
        // "Those dates are not available"
        // if includes, SKIP

        // an array for all the listings with that availability
      };
    };
  };
};

function getData () {
  city = "san%20francisco";

  $.ajax({
    type: "GET",
    url: "http://api.outpost.travel/places/?dest=" + city,
  }).done(function(data){
    console.log(data);
    debugger
    lastPageHref = data._links.last.href;
    totalPagesNum = Math.floor(lastPageHref.split("&page=")[1]);
    nextPageHref = data._links.next.href;
    nextPageNum = Math.floor(nextPageHref.split("&page=")[1]);

    for ( i = 0; i < data._items.length; i++ ) {
      listings.push(data._items[i]);
    };

    getNextListings();

  });
};

$(document).ready(function(){
  getData();
});