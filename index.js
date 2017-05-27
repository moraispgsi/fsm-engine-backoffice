/**
 * Created by Ricardo Morais on 26/05/2017.
 */

let co = require("co");
let request = require("request");

co(function*(){
    let host = process.env.FSM_ENGINE_RESTFUL_HOST;
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

    app.get('/statemachines', function (req, res) {
        co(function*(){
            debug("GET REQUEST: /statemachines");
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

    app.get('/statemachine', function (req, res) {
        co(function*(){
            debug("GET REQUEST: /statemachine");
            request(host + "/getById", {id:req.query.id}, function(error, response, body){

                if(error){
                    debug("Error: " + error);
                    res.json({error: error});
                    return;
                }

                let data = {
                    id: req.query.id,
                    fsm: JSON.stringify(body)
                };

                ejs.renderFile("public/statemachine.ejs", data, null, function (err, html) {
                    if (err) {
                        res.sendStatus(400);
                        return;
                    }
                    res.send(html);
                });

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

