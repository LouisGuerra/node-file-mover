var fs = require("fs");
var path = require('path');
var events = require('events');

var rename = require('./lib/rename'); //modules I wrote.
var append = require('./lib/append');

const dir = './files/original/';  //specify the directories we're working with
const newdir = './files/moved/';  //and the titles of the new lines/properties
const dataHeaders = ['Old Name', 'Old Path', 'New Name', 'New Path'];

var countFiles = 0;
var errorCounter = 0;
var successCounter = 0;
var errorLocations = '';

fs.readdir(dir, (err, files) => { //read dir
	countFiles = files.length; //how many files?
	//iter through files
  	files.forEach(file => {   
		fs.readFile(dir + file, function (err, data) {
			var newdata = ''
			if (err) return console.error(err);
			var newfilename = rename(file); //fetch the name for our new file

			//edit JSON and text files differently
			if (path.extname(file) === '.txt'){
				newdata = append.appendToTxt(data, [file, dir, newfilename, newdir], dataHeaders);
			} else if (path.extname(file) === '.json'){
				newdata = append.appendToJson(data, [file, dir, newfilename, newdir], dataHeaders);
			} else { 
				console.log("invalid file extension found!")
				errorCounter++;
				errorLocations = errorLocations + file + ' ';
				eventEmitter.emit('fileFinished');  //tell event handler
			}
			//attempt to write new edits
			if (newdata.length != ''){
				fs.writeFile(newdir + newfilename, newdata, (err) => {
					if (err) {
					errorCounter++;
					errorLocations = errorLocations + file + ' ';
					} else {successCounter++;}
					
					eventEmitter.emit('fileFinished'); //tell event handler
				});
			}
		});
  	});
})
//event handler to to tell when all files are done
var eventEmitter = new events.EventEmitter();

var checkFinished = function checkFinished() {
  	if (successCounter + errorCounter === countFiles){
  		console.log('Rename ' + successCounter + ' files, with ' 
  			+ errorCounter + ' errors (' + errorLocations + ')');
  	} 
}

eventEmitter.on('fileFinished', checkFinished);



