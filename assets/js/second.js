var searchedFlightsEl = document.querySelector('#searched-flights');
var flightsContainerEl = document.querySelector('#flights-container');
var cityInput = document.getElementById("arrival")

// allows user to type in location
// var startSearch = function () {
//   // localStorage.setItem("City", cityInput)
//   // const urlParams = new URLSearchParams(window.location.search);
//   // var desiredLocation = urlParams.get("search")
//   // console.log(window.location);
//   // console.log("URL Params:", urlParams.keys());
//   // var desiredLocation = localStorage.getItem("cityName")
//   // console.log("Desired Location: " + desiredLocation);

//   // console.log("City var:",cityInput);
  
//   if (desiredLocation) {
//     window.location.href = `./second.html?search=${desiredLocation}`
//     getLocation(desiredLocation)
//   } else {
// 	//   ask user to enter a valid city or location
// 	}
// };
  
// searches for location in booking api
// var getLocation = function (location) {
//   // console.log(location);
//   const options = {
//     method: 'GET',
// 	  headers: {
// 	    'X-RapidAPI-Key': '89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
// 	    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
// 	  }
//   };
	
// 	fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=' + location, options)
// 	  .then(response => response.json())
// 	  .then(response => {inputLocation(response[1].city_name)})
// 	  .catch(err => console.error(err));
//     console.log(response[1].city_name);
	
// };

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
    .then(response => console.log(response[0].cityName))
    .catch(err => console.error(err));
};

// made it to here tonight !!!!!!!!!!!!!!!!!

// places city code into priceline and search flights
var recieveFlight = function (cityCode) {
  let origin = localStorage.getItem("departureLocation")
  const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': '     89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
	  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + cityCode + '&date_departure=2022-11-15&location_departure=' + origin + '&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
	  .then(response => response.json())
	  .then(response => pricedItinerary(response.segment, cityCode))
	  .catch(err => console.error(err));
};

// place city and flights info and grab price itinerary for all flights
var pricedItinerary = function (flights, city){
  const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': '     89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
	  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
  };
	
	fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=' + city + '&date_departure=2022-11-15&location_departure=TPA&sort_order=PRICE&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16', options)
	  .then(response => response.json())
	  .then(response => {
      // console.log(response.pricedItinerary, flights, city);
      displayFlights(response.pricedItinerary, flights, city)})
	  .catch(err => console.error(err));

};

// create a function that will loop through all flights info and itinerary pricing and display on page
var displayFlights = function (prices, flights, city) {
  // console.log("Flights:", flights);
  if (flights.length === 0) {
    searchedFlightsEl.textContent = 'No flights found.';
	return;
  }
  
  searchedFlightsEl.textContent = 'Showing flights for: ' + city;
  
  for (var i = 0; i < flights.length; i++) {
	
  
  var flightEl = document.createElement('div')
  flightEl.classList = 'tile is-child box'

  var flightOriginEl = document.createElement('p')
  flightOriginEl.classList = 'title';
  flightOriginEl.textContent = flights[0].origAirport;
  var departureIcon = document.createElement('i')
  departureIcon.classList = "fa-solid fa-plane-departure";


  var flightDepartureEl = document.createElement('p');
  flightDepartureEl.classList = 'subtitle';
  flightDepartureEl.textContent = 'Departure Date and Time: ' + flights[0].departDateTime;

  var flightDestEl = document.createElement('p')
  flightDestEl.classList = 'title';
  flightDestEl.textContent = flights[0].destAirport;
  var arrivalIcon = document.createElement('i')
  arrivalIcon.classList = "fa-solid fa-plane-arrival";
	  
  var flightArrivalEl = document.createElement('p');
  flightArrivalEl.classList = 'subtitle';
  flightArrivalEl.textContent = 'Arrival Date and Time: ' + flights[0].arrivalDateTime;

  var flightNumberEl = document.createElement('p')
  flightNumberEl.classList = 'subtitle';
  flightNumberEl.textContent = 'Flight Number: ' + flights[0].flightNumber;

  var flightPriceEl = document.createElement('p')
  flightPriceEl.classlist = 'title'
  flightPriceEl.textContent = '$' + prices[0].pricingInfo['baseFare']

  flightsContainerEl.appendChild(flightEl);
  flightEl.appendChild(flightOriginEl);
  flightEl.appendChild(flightDepartureEl);
  flightEl.appendChild(flightDestEl);
  flightEl.appendChild(flightArrivalEl);
  flightEl.appendChild(flightNumberEl)
  flightEl.appendChild(flightPriceEl);	  


 flightOriginEl.appendChild(departureIcon);
 flightDestEl.appendChild(arrivalIcon);
// ]
}



}





$(document).ready(function() {

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {
  
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
  
	});
  });