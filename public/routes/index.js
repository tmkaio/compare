const fs = require('fs');
const {PNG} = require('pngjs');
const pixelmatch = require('pixelmatch');
const url = require('url');

module.exports = function(app) {
 app.get('/', function(req, res) {
    const url_parts = url.parse(req.url,true);
    const img = url_parts.query.img || 1;

    res.render('pages/index', {img: img, result: null});
 });
 app.post('/', function(req, res) {
    const img = req.body.img;
    const pictureOneUrl = 'src/' + img + 'a.png';
    const pictureTwoUrl = 'src/' + img + 'b.png';
    let filesRead = 0;
    const doneReading = () => {
        if (++filesRead < 2) return;
        const diff = new PNG({width: img1.width, height: img1.height});
    
        pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.05});
    
        diff.pack().pipe(fs.createWriteStream('diff.png'));

        setTimeout(() => {
            res.render('pages/index', {img: img, result: 'diff.png'});
        }, 1 * 1000);
        
    }
    const img1 = fs.createReadStream(pictureOneUrl).pipe(new PNG()).on('parsed', doneReading);
    const img2 = fs.createReadStream(pictureTwoUrl).pipe(new PNG()).on('parsed', doneReading);
  });
};

