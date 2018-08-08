const fs = require('fs');
const {PNG} = require('pngjs');
const pixelmatch = require('pixelmatch');

const pictureOneUrl = 'https://github.com/mapbox/pixelmatch/blob/master/test/fixtures/4a.png';
const pictureTwoUrl = 'https://github.com/mapbox/pixelmatch/blob/master/test/fixtures/4b.png';

const img1 = fs.createReadStream(pictureOneUrl).pipe(new PNG()).on('parsed', doneReading);
const img2 = fs.createReadStream(pictureTwoUrl).pipe(new PNG()).on('parsed', doneReading);
let filesRead = 0;

const doneReading = () => {
    if (++filesRead < 2) return;
    const diff = new PNG({width: img1.width, height: img1.height});

    pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});

    diff.pack().pipe(fs.createWriteStream('diff.png'));
}