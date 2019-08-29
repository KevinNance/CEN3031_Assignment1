var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

  //Parses Requested Url
  var parsedUrl = url.parse(request.url);

  //If /listings extension responds with json data otherwise 404
  if(parsedUrl.pathname == "/listings"){
    response.write(listingData);
    response.end();
  }
  else{
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("Bad gateway error");
    response.end();
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  //Check for errors
  if (err) throw err;
      
  //Save the state in the listingData variable already defined
  listingData = data;

  //Creates the server
  server = http.createServer(requestHandler);
  
  //Start the server
  server.listen(port, function(){
    console.log("Server listening on: http://127.0.0.1:" + port);
  });
});