var studioAddress = "4 Jones Quarry Road Woodstock NY 12498";
var kingstonAddress = "Kingston, NY";
var saugertiesAddress = "Saugerties, NY";

var studioLatitude = 42.023656;
var studioLongitude = -74.10752;

var map;
var marker;
var geocoder;
var directions;

function initialize() {
	
	// Draw the map
	map = new GMap2($("map"));
	map.addControl(new GLargeMapControl());
	geocoder = new GClientGeocoder();
	
	// Center the map and set up a marker at the studio
	var point = new GLatLng(studioLatitude, studioLongitude);
	map.setCenter(point, 16);
	marker = new GMarker(point);
	map.addOverlay(marker);
	
	// Set up the directions panel
	directions = new GDirections(map, $("written_directions"));

	// Set up the links
	$("center_the_map").onclick = function () {
		centerTheMap();
		return false;
	};
	
	$("directions_to_kingston").onclick = function () {
		displayDrivingDirections(kingstonAddress);
		return false;
	};
	
	$("directions_to_saugerties").onclick = function () {
		displayDrivingDirections(saugertiesAddress);
		return false;
	};
	
	$("directions_to_anywhere").onclick = function () {
		displayDrivingDirections(window.prompt("What is your address?", ""));
		return false;
	};
	
}

function centerTheMap() {
	map.panTo(new GLatLng(studioLatitude, studioLongitude));
}

function displayDrivingDirections(fromAddress) {
	directions.load(fromAddress+" to "+studioAddress);
	marker.hide();
}

if (GBrowserIsCompatible()) {
	Event.observe(window, 'load', initialize, false);
	Event.observe(window, 'unload', GUnload, false);
}