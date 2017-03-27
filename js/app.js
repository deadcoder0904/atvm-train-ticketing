document.addEventListener('DOMContentLoaded',function() {
	var destinationId = document.querySelector('#destination');
	var singleTicket = document.querySelector('#single');
	var returnTicket = document.querySelector('#return');
	var STATIONS_URL = 'https://gist.githubusercontent.com/deadcoder0904/31ac295473b75b01bb4aefd7c9a7ac81/raw/78013006cd67a141f14424104b3c555399fce5ac/stations.js';
	var stations = [];
	var stationsList = [];

	fetch(STATIONS_URL)
		.then(arr => arr.json())
		.then(res => {
			stationsList = res;
			res.forEach(function(element) {
				if(element.code != 'DDR')
					stations.push(`${element.name} ${element.state == null ? '': ', ' + element.state} ${!element.code.length ? '': '(' + element.code + ')'}`.toUpperCase());
			});
		})

	new Awesomplete(destinationId, {list: stations});

	function finalDecision(singleOrReturn) {
		var price;
		var name = destinationId.value.substring(0,destinationId.value.indexOf(',')).trim().toLowerCase();
		for(var i = 0; i < stationsList.length; i++) {
			if(stationsList[i].name.toLowerCase() == name) {
				price = stationsList[i].price;
				break;
			}
		}
		if(destinationId.value !== '') {
			notie.input({
				  text: 'Enter the number of tickets:',
				  cancelCallback: function (tickets) {
				    notie.alert({ type: 3, text: 'Aw, come back !!'});
				  },
				  submitCallback: function (tickets) {
				    notie.alert({ stay: true, type: 4, text: 'Ticket for ' + tickets + ' people ' + ' costs Rs. ' + (price * singleOrReturn * tickets)});
				  },
				  type: 'text',
				  placeholder: 'Number of people',
				  allowed: new RegExp('[^0-9]', 'g')
				});
			}
		else notie.alert({ type: 3, text: 'Make sure you fill all the fields.' });
	}

	singleTicket.addEventListener('click', function(e) {
		finalDecision(1);
	});

	returnTicket.addEventListener('click', function(e) {
		finalDecision(2);
	});

});
