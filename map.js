'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2gzMzQxIiwiYSI6ImNqc3FzZ2JkZDFiMnEzeW14bzVobGdoOHQifQ.zd31PyqjNUDcgVGp-mJgTw'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-guidance-day-v2',
    center: [-66.53300, 18.21456],
    zoom: 8
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)
})
map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)
})
let marker = new mapboxgl.Marker()
marker.setLngLat([-66.53300,18.21456])
marker.addTo(map)
let popup = new mapboxgl.Popup()
popup.setHTML('Places I Visited Puerto Rico 2014')
marker.setPopup(popup)
let data = [
    {
        location: [-66.06005,18.43277],
        content: 'My journey begins in Old San Juan'
    },
    {
        location: [-65.78034,18.31821],
        content: 'El Yunque is a quick drive from Luquillo'
    },
    {
        location: [-66.61393,18.01074],
        content: 'Ponce was not deserted in 2014'
    },
    {
        location: [-67.21417,17.98503],
        content: 'My favorite beaches are in Cabo Rojo'
    },
    {
        location: [-66.71175,18.45527],
        content: 'Arecibo is another popular town'
    },
    ]
    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})

