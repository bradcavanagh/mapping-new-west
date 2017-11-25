# mapping-new-west
Code used to turn [New Westminster's Open Data catalogue](http://opendata.newwestcity.ca/) into pretty maps.

## Overview

## Configuration

To use Mapzen you'll need to get a developer key [from here](https://mapzen.com/developers/).

To use this key, create a file in `js/Config.js` that consists of the following code:

```
var Config = {
    apiKey : <your_api_key>
}
```

That's it for configuration!

## Converting SHP to GeoJSON

The New Westminster Open Data catalogue has GeoJSON files available, but unfortunately the coordinate system isn't compatible with that used by Mapzen. You will need to download SHP files and convert them.

1. Install `gdal`. On OS X, use homebrew and install it with `brew install gdal`. This will give you the `ogr2ogr` command. On other operating systems, I don't know. Look it up, edit this README, then do a push request with your instructions.
2. Click the link to download the SHP file. Note that this will actually download a ZIP archive.
3. Unzip the archive. This will create a bunch of other files.
4. Run `ogr2ogr -f GeoJSON -t_srs crs:84 outfile.geojson infile.shp`. This will take the input SHP file (`infile.shp`) and create a GeoJSON file with the appropriate coordinate system (`outfile.geojson`).

## Examples

 * [Building Age](https://canspice.org/maps/age/)
 * [Quick-and-dirty FSR](https://canspice.org/maps/fsr/)
