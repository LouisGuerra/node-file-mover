var dateTime = require('node-datetime');
var path = require('path')

//inserts "EDITED_{timestamp}" before file extension.  
module.exports = function(filename) {
    var ext = path.extname(filename);
	var datestring = dateTime.create().format('Y-m-d_H-M');
	
	return filename.replace(ext, '_EDITED_' + datestring) + ext;
}
