mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map', // contain
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
const popupOffsets = {
    top: [0, 20],
    bottom: [0, -20],
    left: [10, 0],
    right: [-10, 0]
};
const marker= new mapboxgl.Marker({color: " red" }) 
    .setLngLat(listing.geometry.coordinates) 
    .setPopup(
        new mapboxgl.Popup({offset: popupOffsets})
        .setHTML(`<h4>${listing.location}</h4>Exact location will be provided after booking`)
    )
    .addTo(map) ;

