function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), { // Setting a new map to display on the web page
        zoom: 3, // How far zoomed the map should be on load
        center: { // Setting the position of the map when it is loaded onto the web page 
            lat: 46.619261,
            lng: -33.134766
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // This is what labels the markers that are placed onto the map. 
    // We then loop through the index of the string to place the label onto the specific marker

    var locations = [ // This is the locations of the markets on the map using the long and lat values as the specific point
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ];

    var markers = locations.map(function(location, i) { // Using the map method to loop over the index and add the label to the locations
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length] // Using the modulo so that if there are more locations than lables. It will start again using the labels for the extra locations
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
} // Creates the marker image on the map itself. Also creating a cluster marker if the markers are close together. 