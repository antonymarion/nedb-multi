const axon = require('axon');
const handler = require('./lib/handler');

const port = Number(process.env.NEDB_MULTI_PORT || 5151) || Number(process.argv[2]);
const dbsMap = new Map();
const repSocket = axon.socket('rep');
const messagesHandler = handler.create(dbsMap);

// bind socket to port
repSocket.bind(port);
repSocket.on('message', messagesHandler);

exports.endConnection = function (callback) {

    // A simple pid lookup
    const pid = parseInt(repSocket.settings.identity);

    repSocket.close();
    // process.kill(pid);
    callback();
    //


}


