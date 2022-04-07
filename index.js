const express = require('express');
const fs = require('fs')
let app = express();

let config;

if (process.argv.indexOf('--local') > 0) {
    config = require("./config.local.json");
} else {
    config = require("./config.prod.json");
}

app.get('/:id', function(req, res) {
    let id = req.params.id;

    try {
        if (fs.existsSync(`${config.pdfPath}/${id}.pdf`)) {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline;filename=pdf/${id}.pdf`)

            fs.readFile(`pdf/${id}.pdf`, function (err,data){
                res.contentType("application/octet-stream");
                res.end(data);
            });
        } else {
            res.end('file-not-found');
        }
    } catch(err) {
        res.end('file-not-found');
    }
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://localhost:8080")
 })