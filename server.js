var statik = require('statik');
var server = statik.createServer();
server.listen(process.env.PORT || 1337);
