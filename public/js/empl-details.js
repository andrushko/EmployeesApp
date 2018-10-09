(function(){

	// ew.fn.getCurrentUser(function(user){
	// 	ew.tempUser = user;
	// 	userDetailsWrapper.innerHTML = getUserDetailsTemplate(user);
	// 	initMap(user);
	// });
	var edb = ew.database;

	edb.open(edb.name, function(db){
		db.get('Employees', 'id', +location.hash.slice(1), function(user){
			// ew.tempUser = user;
			userDetailsWrapper.innerHTML = getUserDetailsTemplate(user);
			initMap(user);
		});
	})

	function getUserDetailsTemplate(user){
		return `
			<div class="col-md-4 col-xs-12 col-sm-6 col-lg-4">
				<img src="${user.avatar}" alt="Avatar ${user.userName}" class="img">
			</div>
			<div class="col-md-8 col-xs-12 col-sm-6 col-lg-8">
				<div class="container" style="border-bottom:1px solid black">
					<h2 id="userName">${user.firstName} ${user.lastName}</h2>
				</div>
				<ul class="container details list-unstyled" style="">
					<li>
						<span class="badge badge-warning">${user.position}</span>
					</li>
					<li>
						<span class="text-info"><i class="fa fas fa-envelope"></i> ${user.email}</span>
					</li>
					<li>
						<span class="${user.dender === 'Male' ? 'text-danger' : 'text-primary'}">
							<i class="fa fas fa-${user.dender === 'Male' ? 'mars' : 'venus'}"></i>
							${user.gender}
						</span>

					</li>
					<li>
						<span>${user.location.city}</span>
					</li>
				</ul>
			</div>
		`;
	}

	function getElements(){
		return {
			userDetailsWrapper: document.getElementById('userDetailsWrapper')
		}
	}
}());



function initMap(user) {
	var myLatLng = {
		lat: user.location.latitude, 
		lng: user.location.longitude
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 10
	});
	var marker = new google.maps.Marker({
		map: map,
		position: myLatLng,
		title: 'Hello World!'
	});
}