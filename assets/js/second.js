var searchedFlightsEl = document.querySelector('#searched-flights');
var flightsContainerEl = document.querySelector('#flights-container');
var cityInput = document.getElementById("arrival")

// places location in priceline flights location api to look for city code
var inputLocation = function (desiredLocation) {
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
  };
  
  fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=' + desiredLocation, options)
    .then(response => response.json())
    .then(response => recieveFlight(response[0].cityCode))
    .catch(err => console.error(err));
};


// places city code into priceline and search flights
var recieveFlight = function (cityCode) {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
  };
  
  fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + cityCode  + '&date_departure=2022-11-15&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
    .then(response => response.json())
    .then(response => pricedItinerary(response.segment, cityCode))
    .catch(err => console.error(err));
};

// passes flight segments and city code to grab price itinerary
var pricedItinerary = function (flights, cityCode){

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
  };
  
  fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + cityCode + '&date_departure=2022-11-15&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
    .then(response => response.json())
    .then(response => displayFlights(response.pricedItinerary[0].pricingInfo['baseFare'], flights, cityCode))
    .catch(err => console.error(err));

};


// create a function that will loop through all flights info and itinerary pricing and display on page
var displayFlights = function (prices, flights, cityCode) {
  if (flights.length === 0) {
    searchedFlightsEl.textContent = 'No flights found.';
	  return;
  };
  
  searchedFlightsEl.textContent = 'Showing flights for: ' + cityCode;
  
  console.log (prices, flights, cityCode);

  for (var i = 0; i < flights.length; i++ ) {
	
  // create a card to host all flights info
  var flightCardEl = document.createElement('div')
  flightCardEl.classList = 'tile is-child box'

  // added flight origin
  var flightOriginEl = document.createElement('p');
  flightOriginEl.classList = 'title';
  flightOriginEl.textContent = flights.origAirport;
  var departureIcon = document.createElement('i')
  departureIcon.classList = "fa-solid fa-plane-departure";

  // added flight depature
  var flightDepartureEl = document.createElement('p');
  flightDepartureEl.classList = 'subtitle';
  flightDepartureEl.textContent = 'Departure Date and Time: ' + flights.departDateTime;

  // added flight destination
  var flightDestEl = document.createElement('p')
  flightDestEl.classList = 'title';
  flightDestEl.textContent = flights.destAirport;

  // added arrival date and time
  var flightArrivalEl = document.createElement('p');
  flightArrivalEl.classList = 'subtitle';
  flightArrivalEl.textContent = 'Arrival Date and Time: ' + flights.arrivalDateTime;

  // added flight number
  var flightNumberEl = document.createElement('p')
  flightNumberEl.classList = 'subtitle';
  flightNumberEl.textContent = 'Flight Number: ' + flights.flightNumber;

  // added flight base fare
  var flightPriceEl = document.createElement('p')
  flightPriceEl.classlist = 'title'
  flightPriceEl.textContent = '$' + prices

 //append items to page 
  flightsContainerEl.appendChild(flightCardEl);
  flightCardEl.appendChild(flightOriginEl);
  flightCardEl.appendChild(flightDepartureEl);
  flightCardEl.appendChild(flightDestEl);
  flightCardEl.appendChild(flightArrivalEl);
  flightCardEl.appendChild(flightNumberEl)
  flightCardEl.appendChild(flightPriceEl);	  


};
};

// you were able to get here this morning!!!!!



$(document).ready(function() {

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {
  
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
  
	});
  });