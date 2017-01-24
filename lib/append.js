var fs = require("fs");

exports.appendToJson = function(data, newLines, headers) {
	//convert string to JSON object, add new properties
   	var jsonData = JSON.parse(data);
   	for (var i = 0; i < headers.length; i++){
   		jsonData[headers[i]] =newLines[i];;
	}
	return JSON.stringify(jsonData, null, 4);
}

exports.appendToTxt = function(data, newLines, headers) {
	//add new lines to text string
	var newdata = data;
	for (var i = 0; i < headers.length; i++) {
   		newdata = newdata + '\r\n' + headers[i] + ": " + newLines[i];
	}
	return newdata;
}

