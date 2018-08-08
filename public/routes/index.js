const fs = require('fs');
const {PNG} = require('pngjs');
const pixelmatch = require('pixelmatch');
const url = require('url');

module.exports = function(app) {
 app.get('/', function(req, res) {
    const url_parts = url.parse(req.url,true);
    const img = url_parts.query.img;

    res.render('pages/index', {img: img});
 });
 app.post('/test', function(req, res) {
    const pictureOneUrl = 'src/' + req.body.img + 'a.png';
    const pictureTwoUrl = 'src/' + req.body.img + 'b.png';
    console.log('pic1', pictureOneUrl);
    console.log('pic2', pictureTwoUrl);
    let filesRead = 0;
    const doneReading = () => {
        if (++filesRead < 2) return;
        const diff = new PNG({width: img1.width, height: img1.height});
    
        pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.05});
    
        diff.pack().pipe(fs.createWriteStream('diff.png'));

        setTimeout(() => {
            res.render('pages/result');
        }, 2 * 1000);
        
    }
    const img1 = fs.createReadStream(pictureOneUrl).pipe(new PNG()).on('parsed', doneReading);
    const img2 = fs.createReadStream(pictureTwoUrl).pipe(new PNG()).on('parsed', doneReading);
  });
};

