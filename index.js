const express = require('express');
const app = express();
const moment = require('moment');

const MONTH = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                'November', 'December'];

app.get('/:time', function (req, res) {
    let dataToSend = {unix: null, natural: null};
    if(/^[0-9]+$/.test(req.params.time)){
        let time = parseInt(req.params.time);
        dataToSend.unix = time;
        time = new Date(time * 1000);
        dataToSend.natural = `${MONTH[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;
        res.end(JSON.stringify(dataToSend));
    }

    if (moment().isValid(req.params.time))
    {
        dataToSend.natural = req.params.time;
        dataToSend.unix = moment(req.params.time, 'MMMM D, YYYY').format('X');
        res.end(JSON.stringify(dataToSend));
    }
})

app.listen(4000, function (err) {
    if(err)console.log(err);
    console.log("app listening on port 4000");
});