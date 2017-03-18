document.addEventListener('DOMContentLoaded',function() {
	var sourceId = document.querySelector('#source');
	var destinationId = document.querySelector('#destination');
	var singleTicket = document.querySelector('#single');
	var returnTicket = document.querySelector('#return');
	var STATIONS_URL = 'https://gist.githubusercontent.com/deadcoder0904/31ac295473b75b01bb4aefd7c9a7ac81/raw/3cd75edaee34fc5a61bff5bf0d239518b65fcc82/stations.js';
	var stations = [];

	fetch(STATIONS_URL)
		.then(arr => arr.json())
		.then(res => {
			res.forEach(function(element) {
				stations.push(`${element.name} ${element.state == null ? '': ', ' + element.state} (${element.code})`.toUpperCase());
			});
		})

	new Awesomplete(sourceId, {list: stations});
	new Awesomplete(destinationId, {list: stations});

	function randomNumber(min,max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function finalDecision(singleOrReturn) {
		var price = randomNumber(300,1500);
		if(sourceId.value !== '' && destinationId.value !== '') {
			notie.date({
			    value: new Date,
			    cancelCallback: function (date) {
			      notie.alert({ type: 3, text: 'Aw, come back !!'});
			    },
			    submitCallback: function (date) {
			      notie.input({
					  text: 'Enter the number of people:',
					  cancelCallback: function (value) {
					    notie.alert({ type: 3, text: 'Aw, come back !!'});
					  },
					  submitCallback: function (value) {
					    notie.alert({ stay: true, type: 4, text: 'Ticket for ' + value + ' people is booked on ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
					    	+ ' costing Rs. ' + (price * singleOrReturn * value)});
					  },
					  type: 'text',
					  placeholder: 'Number of people',
					  allowed: new RegExp('[^0-9]', 'g')
					});
			    }
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
