
        // // let maptoken =mapToken
        // mapboxgl.accessToken = mapToken;
        // const map = new mapboxgl.Map({
        //     container: 'map', // container ID
        //     center: coordinates,
            
        //     // starting position [lng, lat]. Note that lat must be set between -90 and 90
        //     zoom: 8 // starting zoom
        // })
        // const marker1 = new mapboxgl.Marker({color:'red',rotate:60})
        // .setLngLat(coordinates)
        // .addTo(map);
        mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // ID of the div where the map will be loaded
    center: coordinates, // [lng, lat]
    zoom: 8
});

// Create a custom marker element
const markerElement = document.createElement('div');
markerElement.className = 'custom-marker';

// Add Font Awesome icon
markerElement.innerHTML = '<i class="fa-solid fa-house"></i>';

// Style the marker
markerElement.style.fontSize = '10px';  // Adjust size
markerElement.style.color = 'red';  // Change color
markerElement.style.backgroundColor = 'white';  // Change color
markerElement.style.borderRadius = '50%';  // Change color

markerElement.style.textAlign = 'center';
markerElement.style.lineHeight = '20px';
markerElement.style.transform = 'rotate(45deg)';
markerElement.style.boxShadow = '0 0 20px 20px rgba(255, 0, 0, 0.5)'; 

markerElement.style.width = '20px';
markerElement.style.height = '20px';

// Add marker to the map
new mapboxgl.Marker(markerElement)
    .setLngLat(coordinates)
    // .setStyle('mapbox://styles/mapbox/dark-vll')
    .setPopup(new mapboxgl.Popup({offset:25})
    .setHTML("<p>Exact loaction provided after booking</p>"))
    .addTo(map);
