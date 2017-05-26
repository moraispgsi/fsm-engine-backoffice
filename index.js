/**
 * Created by Ricardo Morais on 26/05/2017.
 */

let co = require("co");

co(function*(){
    let host = "10.0.0.165:8081";
    let ejs = require('ejs');
    let debug = require('debug')("backoffice");
    let express = require('express');
    let app = express();
    let bodyParser = require('body-parser');
    app.use(bodyParser.json());         // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(express.static('public'));

    app.get('/backoffice/statemachines', function (req, res) {
        co(function*(){
            debug("GET REQUEST: /backoffice/statemachines");
            ejs.renderFile("public/statemachines.ejs", null, null, function (err, html) {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.send(html);
            });
        }).then().catch((err)=> {
            console.log(err);
            res.json({error: err});
        });
    });

    app.get('/backoffice/statemachine', function (req, res) {
        co(function*(){
            debug("GET REQUEST: /backoffice/statemachine");
            let data = {
                id: req.query.id,
                fsm: JSON.stringify(yield engine.getFsmById(req.query.id))
            };
            ejs.renderFile("public/statemachine.ejs", data, null, function (err, html) {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.send(html);
            });
        }).then().catch((err)=> {
            console.log(err);
            res.json({error: err});
        });
    });

    //Start the server
    let server = app.listen(process.env.PORT || 8080, '0.0.0.0', function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log("listening at http://%s:%s", host, port)
    });

}).then().catch(function(err){
    console.log(err);
});

