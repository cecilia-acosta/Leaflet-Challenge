let mymap = L.map('mapid', {
    center: [30,30],
    zoom:2.4
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

// Function to scale the Magnitude 
function size(magnitude) {
    return magnitude * 50000};
  
// Function for colors
function colors(m) {
    let colors = ['lightgreen','yellowgreen','gold','orange','lightsalmon','tomato'];
    return  m > 6? colors[5]:
            m > 5? colors[4]:
            m > 4? colors[3]:
            m > 3? colors[2]:
            m > 2? colors[1]:
                   colors[0];
};

d3.json(url).then(d=>{
    L.geoJSON(d,{
        pointToLayer: function (feature, coord){
            return L.circle(coord,
                {radius: size(feature.properties.mag),
                fillColor: colors(feature.properties.mag),
                fillOpacity: .8,
                color: 'grey',
                weight: .5
            })
        },
        onEachFeature: function (feature,layer) {
            layer.bindPopup(`<h3>${feature.properties.title}</h3> <hr> <h3>Magnitude: ${feature.properties.mag}</h3>`);
        }    
    }).addTo(mymap)
});