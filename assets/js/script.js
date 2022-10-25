// click handler for tiles
var randomTileEl = $("#random-tile")
var cheapestTileEl = $("#cheapest-tile")
var previousTileEl = $("#previous-tile")
	
randomTileEl.on('click', function () {
	console.log("you clicked random tile")
	// get text off card for random location
	var text = document.querySelector("#randomPlace").textContent
	// pass value to submitRandomLocation function
	submitRandomLocation(text);
});

cheapestTileEl.on('click', function () {
  alert('Hello cheapest');
});

previousTileEl.on('click', function (event) {
  event.preventDefault();
  submitPrevLocation();
	// alert('Hello previous');
});

// allows user to submit random location
var submitRandomLocation = function (randomLocation) {

	if (randomLocation) {
	  window.location.href = `./second.html?search=${randomLocation}`
	   getLocation(randomLocation, desiredDeparture);
	} else {
	   //   ask user to enter a valid city or location
	   alert("please enter a valid location")
	}
  }

// assign input variables
var departureInput = document.querySelector("#departure");
var arrivalInput = document.querySelector("#arrival");

// assign search btn varible
var searchButton = document.querySelector(".search-bar");

  
// event listener for search bar
searchButton.addEventListener("click", function(event) {
  event.preventDefault();
  submitLocation();
});

// allows user to type in location
var submitLocation = function () {
  var desiredLocation = arrivalInput.value.trim();
  var desiredDeparture = departureInput.value.trim();

  localStorage.setItem('previous location', desiredLocation);
  localStorage.setItem('departureLocation', desiredDeparture);
  
//   if (desiredLocation) {
    // window.location.href = `./second.html?search=${desiredLocation}`
 	inputLocation(desiredLocation); 
	//  desiredDeparture was passed in get location
	// startSearch(desiredLocation);
//   } else {
	 //   ask user to enter a valid city or location
//   }
};
  



var prevDesiredLocation = localStorage.getItem('departureLocation');
var prevSearchElement = document.getElementById("prev-tile")
  prevSearchElement.textContent = prevDesiredLocation
// allows user to visit their previous choice in location
var submitPrevLocation = function () {

  	
	if (prevDesiredLocation) {

	  window.location.href = `./second.html?search=${prevDesiredLocation}`
	   getLocation(prevDesiredLocation);
	} 
  };

// Random Country
let randomPlaceElement = document.getElementById("randomPlace")
let randomIndex = Math.floor(Math.random() * countryList.length)
let randomCountry = countryList[randomIndex]
let randomCountry2 = countryList2[randomIndex]
// console.log(randomCountry)

$("#randomPlace").text(randomCountry2)

// Cheapest Flights
var cheapestFlights = function() {

	let cheapTile = document.getElementById("cheap-tile");
	let cheapFlight = document.createElement("div")
	cheapFlight.classList.add("cheapFlight")
	cheapTile.append(cheapFlight)

	let destination = document.createElement("div")
	destination.classList.add("cheap-destination")
	let price = document.createElement("div")
	price.classList.add("cheap-price")

	cheapFlight.append(destination)
	cheapFlight.append(price)


// 	const randomPlace = {
// 		method: 'GET',
// 		headers: {
// 			'X-RapidAPI-Key': '  89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
// 			'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
// 		}
// 	};

// 	fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=United%20States`, randomPlace)
// 		.then(response => response.json())
// 		.then(response => {
// 			let randomCityIndex = Math.floor(Math.random() * response.length)
// 			let citycode = response[randomCityIndex]
// 			// console.log(response);
// 			// console.log(citycode.id)
// 			destination.textContent = citycode.itemName

			
// 		const options = {
// 			method: 'GET',
// 			headers: {
// 				'X-Access-Token': 'a8314f1511ec1cb9c2b8906c4a6cf4fb',
// 				'X-RapidAPI-Key': '   89c9b663dbmshd869209e6d40f5ep11340fjsnebd044f6c87a',
// 				'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
// 			}
// 		};

// 		fetch(`https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?origin=MCO&page=1&currency=USD&destination=${citycode.id}`, options)
// 			.then(response => response.json())
// 			.then(response => {
// 				// console.log(response)
// 				var keys = Object.keys(response.data);
// 				$("#cheap-tile").append(price)
// 				for (var i = 0; i < keys.length; i++) {
// 					var val = response.data[keys[i]];
// 					price.textContent = "$" + val[0].price
// 				}
// 			})
// 			.catch(err => console.error(err));
// 		})
// 		.catch(err => console.error(err));

// }





// datepicker
$(function () {
	$('#departure-date').datepicker()
  });


}
// Uncomment in order to display cheapest flights tile content
// Please comment out after testing in order to save API calls

cheapestFlights();

// allows user to type in location
var submitRandomLocation = function (randomLocation) {

  if (randomLocation) {
    window.location.href = `./second.html?search=${randomLocation}`
 	getLocation(randomLocation, desiredDeparture);
  } else {
	 //   ask user to enter a valid city or location
	 alert("please enter a valid location")
  }
}

// Burger Menu Button
$(document).ready(function() {

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {
  
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
  
	});
  });
