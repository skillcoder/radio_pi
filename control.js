var port = 80;
//var bind_ip = '192.168.1.2';

var express = require('express');
var util = require('util');
var omx = require('omxcontrol');

var app = express();
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
//    app.use(log4js.connectLogger(log, { level: log4js.levels.DEBUG }));
    app.use(omx());
});


app.configure('development', function(){
    util.debug('Development mode!');
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    util.debug('Production mode!');
    var oneDay = 86400000;
    app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.get('/', function(req, res){
    res.redirect(301, '/index.html');
});

app.on('error', function(exc) {
    //log.fatal('ignoring exception: '+exc);
    //debug(sc_cyan+'ERR [app]: ['+exc.errno+'] '+exc+ec);
    switch (exc.errno) {
        case 48: // Error: EADDRINUSE, Address already in use
            process.exit(1);
        break;
    }
});
app.on('timeout', function () {
    util.log('WARN!!! App TIMEOUT');
});

app.listen(port);

/*
var server = app.listen(port, bind_ip, function() {
    //server.listen( function() {
    util.log("Express server listening on port %s:%d in %s mode", server.address().addr, server.address().port, app.settings.env);
});
*/
omx.start('http://radio.battlespace.ru/air');
