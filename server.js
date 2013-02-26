var express = require('express');
var app = express();
app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.all('/*', function(request, response) {
    response.sendfile('public/index.html');
  })
});

app.listen(process.env.PORT || 3333);
