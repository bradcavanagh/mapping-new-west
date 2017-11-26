L.Mapzen.apiKey = Config.apiKey;

var datafiles = {
    playgrounds: '../data/playgrounds/playgrounds.geojson',
    // washrooms: '../data/accessible-public-washrooms/accessible-public-washrooms.geojson',
    skytrain: '../data/skytrain-stations/skytrain-stations.geojson',
    // busstops: '../data/bus-stops/bus-stops.geojson'
};

var heatmapConfigs = {
    playgrounds: { size: 500, units: 'm', alphaRange: 0.05, opacity: 0.65 },
    skytrain: { size: 1000, units: 'm', alphaRange: 0.01, opacity: 0.6 }
};

var heatmaps = {};
var defaultIntensity = 1;

map = (function() {
    'use strict';
    
    var new_west = [49.2089, -122.9175];

    var map = L.Mapzen.map('map', {
      center: new_west,
      zoom: 15,
      scene: 'scene.yaml'
    });

    map.zoomControl.setPosition('topright');

    // Mapzen search box
    const geocoder = L.Mapzen.geocoder();
    geocoder.addTo(map);

    L.Mapzen.hash({
      map: map,
      geocoder: geocoder
    });

    window.addEventListener('load', function() {
        init();
    });

    return map;
}());

function GeoJSONToHeatmap(geojson, intensity)
{
    return geojson.features.map(function(feature) {
        return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0]), intensity * randomInt(1,15)]
    })
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function init() {
    // Load datafiles.
    _.forIn(datafiles, (url, type) => {
        fetch(url).then((response) => {
            response.text().then((responseText) => {
                var heatmap = L.webGLHeatmap(heatmapConfigs[type]);
                heatmaps[type] = GeoJSONToHeatmap(JSON.parse(responseText), defaultIntensity);
                heatmap.setData(heatmaps[type]);
                map.addLayer(heatmap);
                //console.log(JSON.stringify(heatmaps, null, 2));
                //L.heatLayer(heatmaps[type], heatmapConfigs[type]).addTo(map);
            });
        });
    });
}