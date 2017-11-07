var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var querystring = require('querystring');

app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','http://localhost:8080');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.post('/', function(req, res){
    console.log('POST /');
    var body = '';

      req.on('data', function (data) {
          body += data;

      });

    req.on('end', function () {
        io.emit('nlp', body);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('thanks');
        // use post['blah'], etc.
    });

    
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  io.emit('nlp', 'hello');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});