var fs = require('fs');
var gifify = require('gifify');


var input = "./gifs/test1.webm"
var output = './gifs/random/movie.gif'

var gif = fs.createWriteStream(output);

var options = {
  resize: '200:-1',
  from: 30,
  to: 35
};

gifify(input, options).pipe(gif);