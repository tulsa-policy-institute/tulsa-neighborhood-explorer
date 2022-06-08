const { queryAllFeatures } = require('query-all-features');
const { createWriteStream } = require('fs');
const JsonStreamStringify = require('json-stream-stringify');

queryAllFeatures({
  url: 'https://map9.incog.org/arcgis9wa/rest/services/Land_Use_Plan/FeatureServer/1',
  f: 'geojson',
}).then(
  (data) => {
    console.log('finished downloading... now writing');

    const writeStream = createWriteStream('tmp/landuse.json', { flags: 'w' });
    const jsonStream = new JsonStreamStringify(data);

    jsonStream.pipe(writeStream);
    jsonStream.once('error', () =>
      console.log('Error at path', jsonStream.stack.join('.'))
    );
    jsonStream.on('end', () => {
      console.log('done. now run:');
      console.log(`
        tippecanoe -zg -o tmp/landuse.mbtiles --drop-densest-as-needed tmp/landuse.json --force
        pmtiles-convert tmp/landuse.mbtiles public/data/landuse.pmtiles --overwrite
      `);
    });
  },
  (err) => {
    console.error('err', err);
  }
);
