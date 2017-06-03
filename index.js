/**
 * Created by Ricardo Morais on 26/05/2017.
 */

let co = require("co");
let request = require("request");
let rp = require("request-promise");
let validator = require('xsd-schema-validator');

co(function*(){
    let host = process.env.FSM_ENGINE_RESTFUL_HOST;
    let ejs = require('ejs');
    let debug = require('debug')("backoffice");
    let express = require('express');
    let app = express();
    let bodyParser = require('body-parser');
    app.set("views", __dirname + "/templates/views/");
    app.set('view engine', 'ejs');

    debug("HOST: " + host);

    app.use(bodyParser.json());         // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(express.static('public'));

    app.get('/statemachines', function (req, res) {
        co(function*(){
            debug("GET REQUEST: /statemachines");

            debug("Requesting: " + host + "/API/version/all");
            let options = {
                method: 'POST',
                uri: host + "/API/fsm/all",
                json: true // Automatically stringifies the body to JSON
            };

            let body = yield rp(options);
            if(body.error) {
                res.sendStatus(500);
            }
            body.host = host;

            debug("Received: " + JSON.stringify(body));

            ejs.renderFile(__dirname + "/templates/statemachines.ejs", body, null, function (err, html) {
                if (err) {
                    debug("Error: " + err);
                    res.sendStatus(500);
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
            debug("Requesting: " + host + "/API/fsm/getById");

            let options = {
                method: 'POST',
                uri: host + "/API/fsm/getById",
                body: {
                    id: req.query.id
                },
                json: true // Automatically stringifies the body to JSON
            };

            let fsm = yield rp(options);
            if(fsm.error) {
                res.sendStatus(500);
            }
            debug("Received: " + JSON.stringify(fsm));
            debug("Requesting: " + host + "/API/fsm/allVersions");

            options.uri = host + "/API/fsm/allVersions";
            options.body = {
                id: req.query.id
            };
            let body = yield rp(options);
            if(body.error) {
                res.sendStatus(500);
            }
            debug("Received: " + JSON.stringify(body));
            body.versions = body.versions.map((version)=> {
                return {
                    id: version.id,
                    isSealed: version.isSealed,
                    createdAt: version.createdAt,
                    updatedAt: version.updatedAt,
                    parentVersionID: version.parentVersionID,
                };
            });
            let data = {
                id: req.query.id,
                fsm: fsm,
                versions: body.versions,
                host: host
            };
            debug("Template data " + JSON.stringify(data));

            ejs.renderFile(__dirname + "/templates/statemachine.ejs", data, null, function (err, html) {
                if (err) {
                    debug("Error: " + err);
                    res.sendStatus(500);
                    return;
                }
                res.send(html);
            });

        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.get('/versions', function (req, res) {
        co(function*(){
            debug("GET REQUEST: /versions");
            debug("Requesting: " + host + "/API/version/all");

            let options = {
                method: 'POST',
                uri: host + "/API/version/all",
                json: true // Automatically stringifies the body to JSON
            };

            let body = yield rp(options);
            if(body.error) {
                res.sendStatus(500);
            }
            debug("Received: " + JSON.stringify(body));
            debug("Template data " + JSON.stringify(body));


            ejs.renderFile(__dirname + "/templates/versions.ejs", body, null, function (err, html) {
                if (err) {
                    debug("Error: " + err);
                    res.sendStatus(500);
                    return;
                }
                res.send(html);
            });

        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.get('/version', function (req, res) {
        co(function*(){
    		debug("GET REQUEST: /version");
    		debug("Requesting: " + host + "/API/version/getById");

    		let options = {
    		    method: 'POST',
    		    uri: host + "/API/version/getById",
    		    body: {
    		        id: req.query.id
    		    },
    		    json: true // Automatically stringifies the body to JSON
    	    };

    	    let body = yield rp(options);
    	    if(body.error) {
        	    res.sendStatus(500);
        	    return;
    	    }
            debug("Received: " + JSON.stringify(body));
    	    let version = body;

    	    options.uri = host + "/API/version/allInstances";

            body = yield rp(options);
            if(body.error) {
                res.sendStatus(500);
                return;
            }

            debug("Received: " + JSON.stringify(body));
            let instances = body;

    	    let data = {
    	        version: version,
                instances: instances,
                host: host
            };
    	    debug("Template data " + JSON.stringify(data));

    	    ejs.renderFile(__dirname + "/templates/version.ejs", data, null, function (err, html) {
    	        if (err) {
    		        debug("Error: " + err);
    		        res.sendStatus(500);
    		        return;
    	        }
    	        res.send(html);
    	    });

    	}).catch((err)=> {
    	    debug("Error: " + err);
    	    res.json({error: err});
    	});
    });


    app.get('/editor', function (req, res) {
        co(function*(){
    		debug("GET REQUEST: /editor");
    		debug("Requesting: " + host + "/API/version/getById");

    		let options = {
    		    method: 'POST',
    		    uri: host + "/API/version/getById",
    		    body: {
    		        id: req.query.id
    		    },
    		    json: true // Automatically stringifies the body to JSON
    	    };

    	    let body = yield rp(options);
    	    if(body.error) {
        	    res.sendStatus(500);
        	    return;
    	    }
    	    debug("Received: " + JSON.stringify(body));
    	    debug("Template data " + JSON.stringify(body));


    	    ejs.renderFile(__dirname + "/templates/editor.ejs", body, null, function (err, html) {
    	        if (err) {
    		        debug("Error: " + err);
    		        res.sendStatus(500);
    		        return;
    	        }
    	        res.send(html);
    	    });

    	}).catch((err)=> {
    	    debug("Error: " + err);
    	    res.json({error: err});
    	});
    });
    app.get('/instances', function (req, res) {
        co(function*(){
            debug("GET REQUEST: /instances");
            debug("Requesting: " + host + "/API/instance/all");

            let options = {
                method: 'POST',
                uri: host + "/API/instance/all",
                json: true // Automatically stringifies the body to JSON
            };

            let body = yield rp(options);
            if(body.error) {
                res.sendStatus(500);
            }
            debug("Received: " + JSON.stringify(body));
            debug("Template data " + JSON.stringify(body));


            ejs.renderFile(__dirname + "/templates/instances.ejs", body, null, function (err, html) {
                if (err) {
                    debug("Error: " + err);
                    res.sendStatus(500);
                    return;
                }
                res.send(html);
            });

        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.get('/instance', function (req, res) {
        co(function*(){
    		debug("GET REQUEST: /instance");
    		debug("Requesting: " + host + "/API/instance/getById");

    		let options = {
    		    method: 'POST',
    		    uri: host + "/API/instance/getById",
    		    body: {
    		        id: req.query.id
    		    },
    		    json: true // Automatically stringifies the body to JSON
    	    };

    	    let body = yield rp(options);
    	    if(body.error) {
        	    res.sendStatus(500);
        	    return;
    	    }

    	    let data = {
    	        instance: body,
    	        snapshots: [],
                host: host
            };

    	    debug("Received: " + JSON.stringify(body));
    	    debug("Template data " + JSON.stringify(data));

    	    ejs.renderFile(__dirname + "/templates/instance.ejs", data, null, function (err, html) {
    	        if (err) {
    		        debug("Error: " + err);
    		        res.sendStatus(500);
    		        return;
    	        }
    	        res.send(html);
    	    });

    	}).catch((err)=> {
    	    debug("Error: " + err);
    	    res.json({error: err});
    	});
    });

    app.post('/seal', function (req, res) {
        debug("POST REQUEST: /seal");
        co(function*(){

            debug("Received body: ", req.body);
            let options = {
                method: 'POST',
                uri: host + "/API/version/seal",
                body: {
                    id: req.body.id
                },
                json: true // Automatically stringifies the body to JSON
            };

            let body = yield rp(options);
            if(body.error) {
                debug("Error: " + JSON.stringify(body.error));
                res.sendStatus(500);
                return;
            }
            debug("Sending success");
            res.sendStatus(200);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    app.post('/validateScxml', function (req, res) {
        debug("POST: /validateScxml");
        if(!req.body.scxml){
            res.json({error: "scxml property is missing"});
            return;
        }
        validator.validateXML(req.body.scxml, __dirname + '/xmlSchemas/scxml.xsd', function(err, result) {
            if (err) {
                debug("Error: " + err);
                res.json({error: result.messages, isValid: false});
                return;
            }
            res.json({isValid: result.valid});
        })
    });
    app.post('/saveScxml', function (req, res) {
        debug("POST REQUEST: /saveScxml");
        co(function*(){

            debug("Received body: ", req.body);
            let options = {
                method: 'POST',
                uri: host + "/API/version/setScxml",
                body: {
                    scxml: req.body.scxml,
                    id: req.body.id
                },
                json: true // Automatically stringifies the body to JSON
            };

            let body = yield rp(options);
            if(body.error) {
                debug("Error: " + body.error);
                res.sendStatus(500);
                return;
            }
            debug("Sending success");
            res.sendStatus(200);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    //Start the server
    let server = app.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0', function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log("listening at http://%s:%s", host, port)
    });

}).then().catch(function(err){
    console.log(err);
});

