# tulsa-neighborhood-explorer

# ETLs
## Parcels
```bash
ogr2ogr tmp/parcels.geojson \
  -f GeoJSON "https://map9.incog.org/arcgis9wa/rest/services/Parcels_TulsaCo/FeatureServer/1/query?where=objectid%3E0&outfields=*&f=json" ESRIJSON \
  -s_srs EPSG:3857
  -t_srs EPSG:4326

tippecanoe -zg -o tmp/parcels.mbtiles --drop-densest-as-needed --extend-zooms-if-still-dropping tmp/parcels.geojson --force

# Output PMTiles
pmtiles-convert tmp/parcels.mbtiles tmp/parcels.pmtiles --overwrite
```

## Zoning
```bash
ogr2ogr tmp/zoning.geojson \
  -f GeoJSON "https://map9.incog.org/arcgis9wa/rest/services/Zoning_TulsaCo/FeatureServer/0/query?where=objectid%3E0&outfields=*&f=json" ESRIJSON -t_srs EPSG:4326

tippecanoe -zg -o tmp/zoning.mbtiles --drop-densest-as-needed --extend-zooms-if-still-dropping tmp/zoning.geojson --force

# Output PMTiles
pmtiles-convert tmp/zoning.mbtiles tmp/zoning.pmtiles --overwrite
```

## Facilities
Public Schools - https://map9.incog.org/arcgis9wa/rest/services/Tulsa_Area_Schools/FeatureServer/2
Public Libraries - https://map9.incog.org/arcgis9wa/rest/services/Tulsa_Area_Libraries/FeatureServer/0
Hospitals and Clinics
Parks - https://map9.incog.org/arcgis9wa/rest/services/TMA_Parks/FeatureServer/12
Recreation Centers - https://map9.incog.org/arcgis9wa/rest/services/Rec_Centers/FeatureServer/3
Sidewalks - https://map9.incog.org/arcgis9wa/rest/services/Sidewalks_TMA/FeatureServer/4
Pending Cases {
  TMAPC - https://map9.incog.org/arcgis9wa/rest/services/TMAPC_PendingCases/FeatureServer/0
  BOA - https://map9.incog.org/arcgis9wa/rest/services/BOA_PendingCases/FeatureServer/0
}

## 
