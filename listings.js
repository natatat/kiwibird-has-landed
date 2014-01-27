var totalPages,
    airbnbListings = [],
    allListings,
    i;

function getPageData (page) {
  $.ajax({
    type: 'get',
    url: 'http://api.outpost.travel/places/?page='+ page +'&dest=san%20francisco'
  }).done(function (data) {
    totalPages = data.totalPages;
    allListings = data.items;

    if (page === 1) {
      for (i = 0; i < allListings.length; i++) {
        if (allListings[i].provider === 'airbnb') {
          airbnbListings.push(allListings[i]);
        }
      }
    }

    getAirbnbListings(page + 1);
  });
}

function getAirbnbListings (page) {
  if (page <= totalPages) {
    for (i = 0; i < allListings.length; i++) {
      if (allListings[i].provider === 'airbnb') {
        airbnbListings.push(allListings[i]);
      }
    }

    if (page != totalPages) {
      getPageData(page);
    } else {
      return airbnbListings;
    }
  }
}

$(document).ready(function(){
  getPageData(1);
});

// MVP:
// parallel requests
// cache
// filter for tonight / entire place
// map

// picture
// price / cut
// neighborhood
// sleeps how many
// room type
// host rating: 4.5

// select
// button: find me a bed tonight

// authenticate with facebook?
// email
// room available, they get an email/text asking to confirm and input payment info
// host and guest details

// LATER:
